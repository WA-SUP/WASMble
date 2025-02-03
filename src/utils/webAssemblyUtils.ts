export async function createWasmInstance(
  wasmBuffer: ArrayBuffer,
): Promise<WebAssembly.Exports> {
  const wasmInstance = await WebAssembly.instantiate(wasmBuffer);

  return wasmInstance.instance.exports;
}
