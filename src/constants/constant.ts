export const CODE_EDITOR_DEFAULT_VALUE = `function yourFunction(a, b) {
  // your code...
}
`;

export const GUIDE_DIFF_EDITOR_JS_VALUE = `function add(a, b) {
  return a + b;
}`;

export const GUIDE_DIFF_EDITOR_TRANSPILED_AS_VALUE = `function add(a: i32, b: i32): i32 {
  return a + b;
}`;

export interface MeasurementResult {
  type: string;
  operationTimes: number;
}

export const GUIDE_MOCK_DATA = {
  jsCode: "function yourFunction(a, b) { return a + b; }",
  transpiledAsCode:
    "function yourFunction(a: number, b: number): number { return a + b; }",
  measurementResults: [
    {
      type: "JS",
      operationTimes: 142782,
    },
    {
      type: "WASM",
      operationTimes: 582742,
    },
  ] as MeasurementResult[],
  performanceReportId: "guide-sample",
};

export const MODULE_TYPE_TEXT = {
  JAVASCRIPT: "JS",
  WEB_ASSEMBLY: "WASM",
} as const;

export type ModuleType = keyof typeof MODULE_TYPE_TEXT;
