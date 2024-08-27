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
      executionTime: 10,
    };
  });

  const mockPerformanceRejectedResult = [
    {
      cpuUsage: 0,
    },
    {
      cpuUsage: 0,
      executionTime: null,
    },
    {
      cpuUsage: 0,
      executionTime: 10,
    },
    {
      cpuUsage: 0,
      executionTime: 10,
    },
    {
      cpuUsage: 0,
      executionTime: 10,
    },
  ];

  it("성능 측정 결과를 순회하며 평균 실행 시간를 반환해야합니다.", () => {
    expect(calculateAverageExecutionTime(mockPerformanceResults)).toEqual(
      expect.any(Number),
    );

    expect(calculateAverageExecutionTime(mockPerformanceResults)).toBe(10);
  });

  it("측정에 실패한 결과가 존재할 경우 실한 결과를 제외한 평균 실행 시간를 반환해야합니다.", () => {
    expect(
      calculateAverageExecutionTime(mockPerformanceRejectedResult),
    ).toEqual(expect.any(Number));

    expect(calculateAverageExecutionTime(mockPerformanceRejectedResult)).toBe(
      10,
    );
  });
});
