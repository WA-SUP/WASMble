export async function createWasmInstance(wasmBuffer) {
  const wasmInstance = await WebAssembly.instantiate(wasmBuffer);

  return wasmInstance.instance.exports;
}
