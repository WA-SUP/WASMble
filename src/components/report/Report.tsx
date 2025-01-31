import { DiffEditor } from "@monaco-editor/react";

import ReportChartBox from "@components/report/ReportChartBox";
import ReportSpeedBox from "@components/report/ReportSpeedBox";
import SpeedReport from "@components/visualization/SpeedReport";
import PerformanceComparisonChart from "@components/visualization/PerformanceComparisonChart";
import ReportShareButton from "@components/report/ReportShareButton";

export default function Report({ data }) {
  const { asCode, jsCode, performanceReportId } = data;

  return (
    <div className="flex flex-col h-full min-h-[50vh]">
      <div className="h-1/2 pb-3">
        <DiffEditor
          height="100%"
          theme="vs-dark"
          language="javascript"
          original={jsCode}
          modified={asCode}
          options={{
            renderSideBySide: true,
            readOnly: true,
          }}
        />
      </div>
      <div className="h-1/2 flex justify-between">
        <ReportChartBox>
          <PerformanceComparisonChart data={data} />
        </ReportChartBox>
        <div className="w-[35%] flex flex-col justify-between ml-1.5">
          <ReportSpeedBox>
            <SpeedReport data={data} />
          </ReportSpeedBox>
          <ReportShareButton
            className="mt-3 px-3 py-2 w-full rounded-md bg-color-purple font-semibold hover:bg-color-purple-light transition-colors"
            performanceReportId={performanceReportId}
          />
        </div>
      </div>
    </div>
  );
}
