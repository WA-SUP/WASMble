"use client";

import Button from "@components/button/Button";

export default function GuideButton(): React.JSX.Element {
  function handleOpenGuideModal(): void {}

  return (
    <Button
      className="flex items-center justify-center w-9 h-9 rounded-full text-xl border border-color-purple text-color-purple bg-inherit"
      text="&#63;"
      onClick={handleOpenGuideModal}
    />
  );
}
