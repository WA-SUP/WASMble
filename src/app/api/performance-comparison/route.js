import { NextResponse } from "next/server";
import crypto from "crypto";
import { readFile } from "fs/promises";

import generate from "@babel/generator";
import tmp from "tmp";

import executeUserCode from "@logic/performance-comparison/userCodeExecutor";
import parseJscodeToAST from "@utils/jsToAstParser";
import validateArgsLength from "@logic/ast-analysis/validateArgsLength";
import assignFunctionTypes from "@logic/ast-analysis/typeInference";
import * as buildAndCleanup from "@logic/file-operations/buildAndCleanup";
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

    console.log(asCode);

    const asFilePath = await buildAndCleanup.createAsModule(
      asCode,
      UUID,
      tempDirectory,
    );
    const wasmFilePath = await buildAndCleanup.createWASM(
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

    buildAndCleanup.deleteTempDirectory(tempDirectory);

    return NextResponse.json({ result, asCode }, { status: 200 });
  } catch (error) {
    buildAndCleanup.deleteTempDirectory(tempDirectory);

    if (error instanceof ApiError) {
      const { message, statusCode, errorStackMessage } = error;

      return NextResponse.json(
        { message, errorStackMessage },
        { status: statusCode },
      );
    } else {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
