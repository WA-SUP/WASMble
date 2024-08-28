export const CODE_EDITOR_DEFAULT_VALUE = `
  function yourFunction(a, b) {
    // your code...
  }
`;

export const guideMockData = {
  jsCode: "function yourFunction(a, b) { return a + b; }",
  transpiledAsCode:
    "function yourFunction(a: number, b: number): number { return a + b; }",
  operationTimesPerSecond: [
    {
      type: "js",
      operationTimes: 142782,
    },
    {
      type: "wasm",
      operationTimes: 582742,
    },
  ],
  performanceReportId: "guide-sample",
};
