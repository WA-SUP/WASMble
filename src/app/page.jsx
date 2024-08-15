import ContentBox from "@components/common/ContentBox";

export default function Home() {
  return (
    <>
      <section className="flex justify-between items-center flex-grow p-6">
        <ContentBox width="w-[49%]" />
        <ContentBox width="w-[49%]" />
      </section>
    </>
  );
}
