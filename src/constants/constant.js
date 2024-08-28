export const CODE_EDITOR_DEFAULT_VALUE = `
  function yourFunction(a, b) {
    // your code...
  }
`;

export const GUIDE_DIFF_EDITOR_JS_VLAUE = `
  function add(a, b) {
    return a + b;
  }`;

export const GUIDE_DIFF_EDITOR_TRANSPILED_AS_VALUE = `
  function add(a: i32, b: i32): i32 {
    return a + b;
  }`;

export const GUIDE_MOCK_DATA = {
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
