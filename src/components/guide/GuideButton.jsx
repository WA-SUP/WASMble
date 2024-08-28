"use client";

import Button from "@components/button/Button";

export default function GuideButton() {
  function handleOpenGuideModal() {}

  return (
    <Button
      className="flex items-center justify-center w-9 h-9 rounded-full text-xl border border-color-purple text-color-purple bg-inherit"
      text="&#63;"
      onClick={handleOpenGuideModal}
    ></Button>
  );
}
