import { writeFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";
import ApiError from "@logic/api-error/performanceComparison";

export async function createAsModule(code, UUID, directory) {
  const userCode = `export ${code.trim()}`;
  const asFilePath = `${directory.name}/asModule-${UUID}.ts`;

  try {
    await writeFile(asFilePath, userCode);

    return asFilePath;
  } catch (error) {
    throw new ApiError("AS모듈 생성 에러", 500, error.message);
  }
}

export async function createWASM(asFilePath, UUID, directory) {
  const execPromisify = promisify(exec);
  const wasmFilePath = `${directory.name}/wasm-${UUID}.wasm`;
  const command = `npx asc ${asFilePath} --outFile ${wasmFilePath} --optimize`;

  try {
    await execPromisify(command);

    return wasmFilePath;
  } catch (error) {
    throw new ApiError("WASM 생성 에러", 500, error.message);
  }
}

export async function deleteTempDirectory(tempDirectory) {
  try {
    tempDirectory.removeCallback();
  } catch (error) {
    throw new ApiError("tempDirectory 삭제 에러", 500, error.message);
  }
}
