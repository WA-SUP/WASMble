import { writeFile } from "fs/promises";
import { exec } from "child_process";
import { promisify } from "util";

const execPromisify = promisify(exec);

interface Directory {
  name: string;
}

export async function createAsModule(
  code: string,
  UUID: string,
  directory: Directory,
): Promise<string> {
  const userCode = `export ${code.trim()}`;
  const asFilePath = `${directory.name}/asModule-${UUID}.ts`;

  await writeFile(asFilePath, userCode);
  return asFilePath;
}

export async function createWASM(
  asFilePath: string,
  UUID: string,
  directory: Directory,
): Promise<string> {
  const wasmFilePath = `${directory.name}/wasm-${UUID}.wasm`;
  const command = `npx asc ${asFilePath} --outFile ${wasmFilePath} --optimize`;

  await execPromisify(command);
  return wasmFilePath;
}
