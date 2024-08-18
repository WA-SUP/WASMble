import executeVmCode from "./vmCodeExecutor";

describe("executeVmCode", () => {
  it("유저 함수 코드가 정상적으로 실행되어야 한다.", async () => {
    const fixture = `
    function userCode(a, b) {
      return a + b;
    }
    userCode(5, 2);
    `;

    const result = await executeVmCode(fixture);
    expect(result).toBe(7);
  });

  it("유저 함수의 실행이 5초이상 지연되면 에러를 반환해야 한다.", async () => {
    const fixture = `
    function userCode() {
      while(true) {};
    }
    userCode();
    `;

    await expect(executeVmCode(fixture)).resolves.toMatchObject({
      errorMessage: "JavaScript 함수 실행 실패",
      errorStackMessage: "시간 초과",
    });
  }, 10000);
});
