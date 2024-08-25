import { measurePerformanceByFunc } from "./performanceAnalysis";

describe("measurePerformanceByFunc", () => {
  function add(a, b) {
    return a + b;
  }

  function repeatConsoleLog(count) {
    for (let i = 0; i < count; i++) {
      console.log(`Count: ${count + i}`);
    }
  }

  it("함수의 성능을 측정하며 결과를 반환해야합니다.", () => {
    expect(measurePerformanceByFunc(add, [1, 2], "JS")).toEqual(
      expect.objectContaining({
        cpuUsage: expect.any(Number),
        executionTime: expect.any(Number),
        type: expect.any(String),
      }),
    );

    expect(measurePerformanceByFunc(repeatConsoleLog, [3], "JS")).toEqual(
      expect.objectContaining({
        cpuUsage: expect.any(Number),
        executionTime: expect.any(Number),
        type: expect.any(String),
      }),
    );
  });
});
