import dynamic from "next/dynamic";
import ContentBox from "@components/common/ContentBox";
import ReportChartBox from "@components/report/ReportChartBox";
import ReportSpeedBox from "@components/report/ReportSpeedBox";
import SpeedReport from "@components/visualization/SpeedReport";
import { findPerformanceReportById } from "@logic/db-query/performanceResultQuery";

const DynamicPerformanceComparisonChart = dynamic(
  () => import("@components/visualization/PerformanceComparisonChart"),
);
const DynamicDiffEditor = dynamic(
  () => import("@components/editor/ReportDiffEditor"),
);

interface ResultPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ResultPageProps) {
  const { id } = params;

  return {
    title: "WASMble",
    description: "JavaScript 코드와 WebAssembly 코드의 성능을 비교해 줍니다.",
    metadataBase: new URL(process.env.PROJECT_URL as string),
    openGraph: {
      title: "WASMble",
      description: "JavaScript 코드와 WebAssembly 코드의 성능을 비교해 줍니다.",
      images: [{ url: "/wasmble.png", alt: "WASMble logo" }],
      url: `measurement-result/${id}`,
    },
  };
}

export default async function ResultPage({
  params,
}: ResultPageProps): Promise<JSX.Element> {
  const { id } = params;
  const report = await findPerformanceReportById(id);

  if (!report) {
    return <div>데이터가 없습니다.</div>;
  }

  const { jsCode, transpiledAsCode } = report;

  return (
    <section className="flex flex-col justify-center items-center p-4 w-full">
      <div className="flex flex-col gap-4 w-full max-w-7xl">
        <ContentBox custom="flex flex-col h-full">
          <div className="flex-grow h-full min-h-0">
            <DynamicDiffEditor
              originalCode={jsCode}
              modifiedCode={transpiledAsCode}
            />
          </div>
        </ContentBox>

        <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
          <ReportChartBox>
            <DynamicPerformanceComparisonChart data={report} />
          </ReportChartBox>
          <ReportSpeedBox>
            <SpeedReport data={report} />
          </ReportSpeedBox>
        </div>
      </div>
    </section>
  );
}
