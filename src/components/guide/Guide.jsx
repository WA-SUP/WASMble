import Image from "next/image";

import folderIcon from "@public/folder_filled.svg";
import ContentBox from "@components/common/ContentBox";
import DiffEditor from "@components/editor/DiffEditor";
import SpeedReport from "@components/visualization/SpeedReport";
import PerformanceComparisonChart from "@components/visualization/PerformanceComparisonChart";

import {
  GUIDE_MOCK_DATA,
  GUIDE_DIFF_EDITOR_JS_VALUE,
  GUIDE_DIFF_EDITOR_TRANSPILED_AS_VALUE,
} from "@constants/constant";

export default function Guide() {
  return (
    <div className="flex flex-col justify-between p-3 w-full h-full">
      <div className="flex flex-row justify-between h-48 pb-3">
        <ContentBox
          width="w-[48%]"
          borderColor="border-notice-border"
          bg="bg-color-notice"
        >
          <h2 className="flex items-center font-semibold text-xl">
            <span className="text-2xl mr-2">&#9888;</span>
            Notice!
          </h2>
          <ul className="mt-2 ml-6 list-disc vw-3 text-xs lg:text-sm 2xl:text-lg">
            <li>데이터 타입은 원시값(Number, String)만 지원합니다.</li>
            <li>입력한 함수와 동일한 갯수의 매개변수를 입력해주세요.</li>
            <li> 아래는 성능 비교 결과에 대한 예시입니다</li>
          </ul>
        </ContentBox>
        <ContentBox width="w-[48%]">
          <h2 className="flex items-center font-bold text-xs lg:text-sm 2xl:text-lg">
            <Image
              src={folderIcon}
              alt="Archive Logo Image"
              width={24}
              priority
              className="mr-1"
            />
            Archive
          </h2>
        </ContentBox>
      </div>
      <ContentBox custom="flex flex-col justify-around items-center gap-2">
        <DiffEditor
          originalCode={GUIDE_DIFF_EDITOR_JS_VALUE}
          modifiedCode={GUIDE_DIFF_EDITOR_TRANSPILED_AS_VALUE}
        />
        <div className="flex flex-row justify-around w-full h-full pt-3">
          <ContentBox
            width="w-[64%]"
            height="inherit"
            custom="flex flex-col justify-center"
          >
            <PerformanceComparisonChart data={GUIDE_MOCK_DATA} />
          </ContentBox>
          <ContentBox
            width="w-[32%]"
            height="inherit"
            custom="flex flex-col justify-center"
          >
            <SpeedReport data={GUIDE_MOCK_DATA} />
          </ContentBox>
        </div>
      </ContentBox>
    </div>
  );
}
