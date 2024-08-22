import ContentBox from "@components/common/ContentBox";
import DiffEditor from "@components/editor/DiffEditor";
import GuideText from "@components/guide/GuideText";

export default function Guide() {
  return (
    <div className="flex flex-col p-3 h-full w-full">
      <div>
        <h1 className="text-3xl font-bold">가이드</h1>
        <GuideText />
      </div>
      <div>
        <h2 className="text-2xl font-bold">결과물 예시</h2>
        <div className="flex flex-col justify-around gap-4 mt-4">
          <ContentBox>
            <DiffEditor />
          </ContentBox>
          <ContentBox>
            <img
              src="gauge.png"
              alt="WebAssembly Performance"
              className="h-auto mx-auto"
            />
          </ContentBox>
        </div>
      </div>
    </div>
  );
}
