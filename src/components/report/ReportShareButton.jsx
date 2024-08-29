"use client";

import Button from "@components/button/Button";

export default function ReportShareButton({ className, performanceReportId }) {
  async function handleReportShareButtonClick() {
    const urlToShare = `${window.location.origin}/measurement-result/${performanceReportId}`;

    try {
      await navigator.clipboard.writeText(urlToShare);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button
      className={className}
      onClick={handleReportShareButtonClick}
      text="URL 복사"
    />
  );
}
