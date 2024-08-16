import executeVmCode from "./vmCodeExecutor";

jest.mock("./vmCodeExecutor");

describe("executeVmCode", () => {
  it("유저 함수 코드가 정상적으로 실행되어야 한다.", async () => {
    const fixture = `function userCode() {
      return 5 + 2;
    }
    userCode();`;

    executeVmCode.mockResolvedValue(7);

    const result = await executeVmCode(fixture);
    expect(result).toBe(7);
  });

  it("유저 함수의 실행이 5초이상 지연되면 에러를 반환해야 한다.", async () => {
    const fixture = `function userCode() {
      while(true) {};
    }
    userCode();`;

    executeVmCode.mockRejectedValue(new Error("시간 초과"));

    await expect(async () => {
      await executeVmCode(fixture);
    }).rejects.toThrowError("시간 초과");
  });
});
