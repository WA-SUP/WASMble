import React from "react";

const GuideText = () => {
  return (
    <div className="text-xs whitespace-pre-wrap max-w-full rounded-lg p-4">
      <p className="mb-4">
        함수를 입력하고, 매개변수를 지정하여{" "}
        <span className="font-bold text-yellow-600">JavaScript</span>와{" "}
        <span className="font-bold text-purple">WASM</span>모듈의 성능을 비교할
        수 있습니다.
      </p>
      <ol className="list-decimal ml-5 space-y-2">
        <li>
          사용자는 화면 좌측의 코드 에디터를 통해{" "}
          <span className="font-bold text-yellow-600">JavaScript</span> 함수를
          입력할 수 있습니다.
          <ul className="list-disc ml-5 space-y-1">
            <li>이 함수는 이후의 모든 성능 비교의 기준이 됩니다.</li>
            <li>
              입력 시 함수 이름, 매개변수, 함수내용을 정확히 작성하는 것이
              중요합니다.
            </li>
          </ul>
        </li>
        <li>
          함수를 입력한 후, 화면 하단의{" "}
          <span className="font-bold text-green-600">실행</span>버튼을 클릭하면
          매개변수 입력을 위한 모달이 나타납니다.
          <ul className="list-disc ml-5 space-y-1">
            <li>입력한 함수에 필요한 만큼 매개변수를 입력해주세요.</li>
          </ul>
        </li>
        <li>
          매개변수 입력 시,{" "}
          <span className="font-bold text-green-600">엔터</span>를 눌러 추가할
          수 있습니다.
          <ul className="list-disc ml-5 space-y-1">
            <li>
              삭제가 필요한 경우 매개변수의 오른쪽의{" "}
              <span className="font-bold text-red-600">X</span>버튼을 누르면
              삭제됩니다.
            </li>
          </ul>
        </li>
        <li>
          모든 매개변수를 입력한 후,{" "}
          <span className="font-bold text-green-600">확인</span>버튼을 클릭하면
          함수가 실행됩니다.
          <ul className="list-disc ml-5 space-y-1">
            <li>
              이 과정에서 당신의{" "}
              <span className="font-bold text-yellow-600">JavaScript</span>
              코드는 아래의 과정을 거치게 됩니다
            </li>
            <li>
              <span className="font-bold text-yellow-600">JavaScript코드</span>{" "}
              →{" "}
              <span className="font-bold text-blue-600">
                AssemblyScript코드
              </span>
              로 변환 → <span className="font-bold text-purple">WASM</span>으로
              변환
            </li>
          </ul>
        </li>
        <li>
          변환이 완료되는 순간까지 로딩창을 제공합니다.
          <ul className="list-disc ml-5 space-y-1">
            <li>
              입력에 문제가 있거나, 지원하지 않는 타입이라면 그에 맞는 응답을
              받게 됩니다.
            </li>
          </ul>
        </li>
        <li>
          변환이 완료되면{" "}
          <span className="font-bold text-yellow-600">JavaScript</span>함수와
          생성된 <span className="font-bold text-purple">WASM</span>모듈간의
          성능 비교 결과를 확인할 수 있습니다.
        </li>
      </ol>
    </div>
  );
};

export default GuideText;
