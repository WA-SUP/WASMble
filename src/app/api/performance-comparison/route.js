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

export async function POST(request) {
  const UUID = crypto.randomUUID();
  const tempDirectory = tmp.dirSync({ unsafeCleanup: true });

  try {
    const { functionCode, functionCall, functionArguments, functionName } =
      await request.json();
    const parsedFunctionArguments = JSON.parse(functionArguments);
    const normalizedFunctionCode = functionCode.replace(/\n/g, "");

    const userCodeResult = await executeUserCode(
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
    const { code: asCode } = generate.default(
      asAst,
      {},
      normalizedFunctionCode,
    );

    const asFilePath = await moduleBuild.createAsModule(
      asCode,
      UUID,
      tempDirectory,
    );
    const wasmFilePath = await moduleBuild.createWASM(
      asFilePath,
      UUID,
      tempDirectory,
    );

    const wasmBuffer = await readFile(wasmFilePath);

    const measurementResults = await executeMeasurementInVm({
      wasmBuffer,
      javascriptCode: normalizedFunctionCode,
      extractedJsFuncName: functionName,
      args: parsedFunctionArguments,
    });

    const performanceReportId = await createPerformanceReport({
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

    const isApiError = error instanceof ApiError;
    if (isApiError) {
      const { message, status, errorStackMessage } = error;
      console.error(`${message}: ${errorStackMessage}`);

      return NextResponse.json({ message, errorStackMessage }, { status });
    }
    const isDevelopment = process.env.NODE_ENV === "development";
    const message = isDevelopment
      ? { message: error.message }
      : { message: "서버 내부 에러" };

    console.error(error.message);

    return NextResponse.json(message, { status: 500 });
  }
}
