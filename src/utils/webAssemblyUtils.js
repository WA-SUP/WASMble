import asc from "assemblyscript/dist/asc.js";

export async function createWasmInstance(stringCode) {
  const { binary: wasmBuffer } = await asc.compileString(stringCode, {
    optimize: true,
  });
  const wasmModule = await WebAssembly.instantiate(wasmBuffer);

  return { ...wasmModule.instance.exports };
}
