import { measurePerformance } from "./performanceAnalysis";

describe("measurePerformance", () => {
  function add(a, b) {
    return a + b;
  }

  function repeat(count) {
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count / 2; j++) {}
    }
  }

  it("함수의 성능을 측정하며 결과를 반환해야합니다.", () => {
    expect(measurePerformance(add, [1, 2], "JS")).toEqual(
      expect.objectContaining({
        type: expect.any(String),
        operationTimes: expect.any(Number),
      }),
    );

    expect(measurePerformance(repeat, [10], "JS")).toEqual(
      expect.objectContaining({
        type: expect.any(String),
        operationTimes: expect.any(Number),
      }),
    );
  });
});
