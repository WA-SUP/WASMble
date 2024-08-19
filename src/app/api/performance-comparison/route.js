import { NextResponse } from "next/server";

import executeUserCode from "@logic/performance-comparison/userCodeExecutor";

// 테스트를 위해 작성하였습니다. 성능 비교분석 로직 구현 이후 수정될 예정입니다.

export async function POST(request) {
  const userResult = await executeUserCode(request);

  if (hasRequestError(userResult)) {
    return NextResponse.json(userResult, { status: 400 });
  }
}

function hasRequestError(userResult) {
  if (typeof userResult === "object") {
    return Object.hasOwn(userResult, "errorMessage");
  }

  return false;
}
