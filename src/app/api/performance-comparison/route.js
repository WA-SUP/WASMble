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

export async function POST(request) {
  const UUID = crypto.randomUUID();
  const tempDirectory = tmp.dirSync({ unsafeCleanup: true });

  try {
    const { functionCode, functionCall, functionArguments, functionName } =
      await request.json();
    const parsedFunctionArguments = JSON.parse(functionArguments);

    const userCodeResult = await executeUserCode(functionCode, functionCall);

    const jsAst = parseJscodeToAST(functionCode);

    validateArgsLength(jsAst, parsedFunctionArguments);

    const asAst = assignFunctionTypes(
      jsAst,
      parsedFunctionArguments,
      userCodeResult,
    );
    const { code: asCode } = generate.default(asAst, {}, functionCode);

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

    const result = await executeMeasurementInVm({
      wasmBuffer,
      javascriptCode: functionCode,
      extractedJsFuncName: functionName,
      args: parsedFunctionArguments,
    });

    tempDirectory.removeCallback();

    return NextResponse.json({ result, asCode }, { status: 200 });
  } catch (error) {
    tempDirectory.removeCallback();

    const isApiError = error instanceof ApiError;

    if (!isApiError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    const { message, status, errorStackMessage } = error;

    return NextResponse.json({ message, errorStackMessage }, { status });
  }
}
