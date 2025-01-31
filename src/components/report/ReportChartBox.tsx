import ContentBox from "@components/common/ContentBox";

export default function ReportChartBox({ children }) {
  return (
    <ContentBox
      width="w-[65%]"
      custom="mr-1.5 flex justify-center items-center"
    >
      {children}
    </ContentBox>
  );
}
