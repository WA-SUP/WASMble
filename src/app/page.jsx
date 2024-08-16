import CodeEditorWrapper from "@/components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";

export default function Home() {
  return (
    <>
      <section className="flex justify-between items-center flex-grow p-6">
        <ContentBox width="w-[49%]">
          <CodeEditorWrapper />
        </ContentBox>
        <ContentBox width="w-[49%]">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold"> 성능 비교 UI</h1>
          </div>
        </ContentBox>
      </section>
    </>
  );
}
