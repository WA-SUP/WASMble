import ivm from "isolated-vm";

export default async function executeVmCode(
  userFunctionCode,
  userFunctionCall,
) {
  const isolatedVm = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolatedVm.createContext();
  const timeoutLimit = 5000;

  let timeoutId;

  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("시간 초과"));
    }, timeoutLimit);
  });

  try {
    const script = await isolatedVm.compileScript(
      userFunctionCode + userFunctionCall,
    );
    const result = await Promise.race([script.run(context), timeoutPromise]);

    return result;
  } catch (error) {
    return {
      errorMessage: "JavaScript 함수 실행 실패",
      errorStackMessage: error.message,
    };
  } finally {
    clearTimeout(timeoutId);
    context.release();
    isolatedVm.dispose();
  }
}
