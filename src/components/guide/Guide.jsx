import ContentBox from "@components/common/ContentBox";
import DiffEditor from "@components/editor/DiffEditor";
import SpeedReport from "@/components/visualization/SpeedReport";
import PerformanceComparisonChart from "@/components/visualization/PerformanceComparisonChart";

import { guideMockData } from "@/constants/constant";

export default function Guide() {
  return (
    <div className="flex flex-col justify-between p-3 w-full h-full">
      <div className="flex flex-row justify-between h-48 pb-3">
        <ContentBox
          width="w-[48%]"
          borderColor="border-notice-border"
          bg="bg-color-notice"
        >
          <h2 className="flex items-center font- text-xl">
            <span className="text-2xl mr-2">&#9888;</span>
            Notice!
          </h2>
          <ul className="mt-2 ml-6 list-disc">
            <li>데이터 타입은 원시값(Number, String)만 지원합니다.</li>
            <li>입력한 함수와 동일한 갯수의 매개변수를 입력해주세요.</li>
          </ul>
        </ContentBox>
        <ContentBox width="w-[48%]">
          <h2 className="flex items-center font-bold text-xl">
            <span className="text-2xl mr-2">&#128193;</span>
            Archive
          </h2>
        </ContentBox>
      </div>
      <ContentBox custom="flex flex-col justify-around items-center gap-2">
        <DiffEditor />
        <div className="flex flex-row justify-around w-full h-full pt-3">
          <ContentBox
            width="w-[64%]"
            height="inherit"
            custom="flex flex-col justify-center"
          >
            <PerformanceComparisonChart data={guideMockData} />
          </ContentBox>
          <ContentBox
            width="w-[32%]"
            height="inherit"
            custom="flex flex-col justify-center"
          >
            <SpeedReport data={guideMockData} />
          </ContentBox>
        </div>
      </ContentBox>
    </div>
  );
}
