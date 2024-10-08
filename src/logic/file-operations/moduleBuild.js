import { writeFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

export async function createAsModule(code, UUID, directory) {
  const userCode = `export ${code.trim()}`;
  const asFilePath = `${directory.name}/asModule-${UUID}.ts`;
  await writeFile(asFilePath, userCode);

  return asFilePath;
}

export async function createWASM(asFilePath, UUID, directory) {
  const execPromisify = promisify(exec);
  const wasmFilePath = `${directory.name}/wasm-${UUID}.wasm`;
  const command = `npx asc ${asFilePath} --outFile ${wasmFilePath} --optimize`;

  await execPromisify(command);

  return wasmFilePath;
}
