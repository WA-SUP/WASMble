import {
  calculateAverageExecutionTime,
  measurePerformanceByFunc,
} from "./performanceAnalysis";

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

describe("calculateAverageExecutionTime", () => {
  const mockPerformanceResults = new Array(5).fill(0).map((_, index) => {
    return {
      cpuUsage: 0,
      executionTime: null,
    };
  });

  it("성능 측정 결과를 순회하며 평균 실행 시간를 반환해야합니다.", () => {
    expect(calculateAverageExecutionTime(mockPerformanceResults)).toEqual(
      expect.any(Number),
    );

    expect(calculateAverageExecutionTime(mockPerformanceResults)).toBe(0);
  });

  it("실행 시간이 존재하지 않을 경우 0으로 대체하여 결과값을 반환해야합니다.", () => {
    expect(
      calculateAverageExecutionTime([
        {
          cpuUsage: 0,
          executionTime: null,
        },
        {
          cpuUsage: 0,
          executionTime: 1,
        },
      ]),
    ).toEqual(expect.any(Number));

    expect(
      calculateAverageExecutionTime([
        {
          cpuUsage: 0,
          executionTime: null,
        },
        {
          cpuUsage: 0,
          executionTime: 1,
        },
      ]),
    ).toBe(1 / 2);
  });
});
