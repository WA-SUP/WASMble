import dynamic from "next/dynamic";

import ReportSpeedBox from "@components/report/ReportSpeedBox";
import ReportChartBox from "@components/report/ReportChartBox";
import SpeedReport from "@components/visualization/SpeedReport";
import { findPerformanceReportById } from "@logic/db-query/performanceResultQuery";

const DynamicPerformanceComparisonChart = dynamic(
  () => import("@components/visualization/PerformanceComparisonChart"),
);
const DynamicDiffEditor = dynamic(
  () => import("@components/editor/ReportDiffEditor"),
);

export async function generateMetadata({ params }) {
  const { id } = await params;

  return {
    title: "WASMble",
    description: "JavaScript 코드와 WebAssembly 코드의 성능을 비교해 줍니다.",
    metadataBase: new URL(process.env.PROJECT_URL),
    openGraph: {
      title: "WASMble",
      description: "JavaScript 코드와 WebAssembly 코드의 성능을 비교해 줍니다.",
      images: [
        {
          url: "/wasmble.png",
          alt: "WASMble logo",
        },
      ],
      url: `measurement-result/${id}`,
    },
  };
}

export default async function ResultPage({ params }) {
  const { id } = await params;

  const report = await findPerformanceReportById(id);
  const { jsCode, transpiledAsCode } = report;

  return (
    <section className="flex flex-col justify-center items-center p-6 w-full h-full">
      <div className="flex flex-col h-full w-full min-h-[50vh]">
        <div className="h-1/2 pb-3">
          <DynamicDiffEditor
            height="100%"
            theme="vs-dark"
            language="javascript"
            originalCode={jsCode}
            modifiedCode={transpiledAsCode}
            options={{
              renderSideBySide: true,
              readOnly: true,
            }}
          />
        </div>
        <div className="h-1/2 flex justify-between">
          <ReportChartBox>
            <DynamicPerformanceComparisonChart data={report} />
          </ReportChartBox>
          <div
            className="w-[35%]"
            custum="flex flex-col justify-between ml-1.5"
          >
            <ReportSpeedBox>
              <SpeedReport data={report} />
            </ReportSpeedBox>
          </div>
        </div>
      </div>
    </section>
  );
}
