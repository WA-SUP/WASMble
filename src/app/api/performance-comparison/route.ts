import { NextResponse } from "next/server";
import crypto from "crypto";
import { readFile } from "fs/promises";

import generate from "@babel/generator";
import tmp from "tmp";

import executeUserCode from "@logic/performance-comparison/userCodeExecutor";
import parseJscodeToAST from "@utils/jsToAstParser";
import validateArgsLength from "@logic/ast-analysis/validateArgsLength";
import assignFunctionTypes from "@logic/ast-analysis/typeInference";
import * as moduleBuild from "@logic/file-operations/moduleBuild";
import executeMeasurementInVm from "@logic/performance-comparison/measurementExecutor";
import ApiError from "@logic/api-error/performanceComparison";
import { createPerformanceReport } from "@logic/db-query/performanceResultQuery";

interface PerformanceComparisonRequest {
  functionCode: string;
  functionCall: string;
  functionArguments: string;
  functionName: string;
}

interface ApiErrorResponse {
  message: string;
  errorStackMessage?: string;
}

interface MeasurementResult {
  type: string;
  operationTimes: number;
}

export async function POST(request: Request): Promise<NextResponse> {
  const UUID: string = crypto.randomUUID();
  const tempDirectory = tmp.dirSync({ unsafeCleanup: true });

  try {
    const {
      functionCode,
      functionCall,
      functionArguments,
      functionName,
    }: PerformanceComparisonRequest = await request.json();

    const parsedFunctionArguments: (
      | string
      | number
      | boolean
      | null
      | undefined
    )[] = JSON.parse(functionArguments);

    const normalizedFunctionCode: string = functionCode.replace(/\n/g, "");

    const userCodeResult = await executeUserCode<unknown>(
      normalizedFunctionCode,
      functionCall,
    );

    const jsAst = parseJscodeToAST(normalizedFunctionCode);
    validateArgsLength(jsAst, parsedFunctionArguments);

    const asAst = assignFunctionTypes(
      jsAst,
      parsedFunctionArguments,
      userCodeResult,
    );
    const { code: asCode } = generate(asAst, {}, normalizedFunctionCode);

    const asFilePath: string = await moduleBuild.createAsModule(
      asCode,
      UUID,
      tempDirectory,
    );
    const wasmFilePath: string = await moduleBuild.createWASM(
      asFilePath,
      UUID,
      tempDirectory,
    );

    const wasmBuffer: ArrayBuffer = new Uint8Array(await readFile(wasmFilePath))
      .buffer;

    const measurementResults: MeasurementResult[] =
      await executeMeasurementInVm({
        wasmBuffer,
        javascriptCode: normalizedFunctionCode,
        extractedJsFuncName: functionName,
        args: parsedFunctionArguments,
      });

    const performanceReportId: string = await createPerformanceReport({
      measurementResults,
      transpiledAsCode: asCode,
      jsCode: functionCode,
    });

    tempDirectory.removeCallback();

    return NextResponse.json(
      { asCode, measurementResults, performanceReportId, jsCode: functionCode },
      { status: 200 },
    );
  } catch (error) {
    tempDirectory.removeCallback();

    if (error instanceof ApiError) {
      const { message, status, errorStackMessage } = error;
      console.error(`${message}: ${errorStackMessage}`);

      return NextResponse.json<ApiErrorResponse>(
        { message, errorStackMessage },
        { status },
      );
    }

    const isDevelopment = process.env.NODE_ENV === "development";
    const message = isDevelopment
      ? { message: (error as Error).message }
      : { message: "서버 내부 에러" };

    console.error((error as Error).message);

    return NextResponse.json<ApiErrorResponse>(message, { status: 500 });
  }
}
