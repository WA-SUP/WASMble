import { writeFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

export async function createAsModule(code, UUID, directory) {
  const userCode = `export ${code.trim()}`;
  const asFilePath = `${directory.name}/asModule-${UUID}.ts`;

  try {
    await writeFile(asFilePath, userCode);

    return asFilePath;
  } catch (error) {
    console.error("as모듈 생성 에러: ", error);
  }
}

export async function createWASM(asFilePath, UUID, directory) {
  const execPromisify = promisify(exec);
  const wasmFilePath = `${directory.name}/wasm-${UUID}.wasm`;
  const command = `npx asc ${asFilePath} --outFile ${wasmFilePath} --optimize`;

  try {
    const { stderr } = await execPromisify(command);

    if (stderr) {
      console.error("wasm 빌드 stderr: ", stderr);
    }

    return wasmFilePath;
  } catch (error) {
    console.error("WASM 빌드 에러: ", error);
  }
}

export async function deleteTempDirectory(tempDirectory) {
  try {
    tempDirectory.removeCallback();
  } catch (error) {
    console.error("tempDirectory 삭제 완료: ", error);
  }
}
