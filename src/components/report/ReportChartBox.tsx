import ContentBox from "@components/common/ContentBox";
import { ReactNode } from "react";

interface ReportChartBoxProps {
  children: ReactNode;
}

export default function ReportChartBox({
  children,
}: ReportChartBoxProps): React.JSX.Element {
  return (
    <ContentBox width="w-full" custom="mr-1.5 flex justify-center items-center">
      {children}
    </ContentBox>
  );
}
