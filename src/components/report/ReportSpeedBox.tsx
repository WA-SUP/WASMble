import ContentBox from "@components/common/ContentBox";
import { ReactNode } from "react";

interface ReportSpeedBoxProps {
  children: ReactNode;
}

export default function ReportSpeedBox({
  children,
}: ReportSpeedBoxProps): React.JSX.Element {
  return <ContentBox height="h-full">{children}</ContentBox>;
}
