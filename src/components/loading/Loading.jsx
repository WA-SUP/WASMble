"use client";

import ContentBox from "@components/common/ContentBox";
import SkeletonBox from "@components/loading/SkeletonBox";

export default function Loading() {
  return (
    <div className="flex flex-col justify-between p-3 w-full h-full">
      <ContentBox custom="flex flex-col justify-around items-center gap-2">
        <SkeletonBox width="w-full" height="h-1/2" />
        <div className="flex flex-row justify-around w-full h-1/2 pt-3 gap-4">
          <ContentBox width="w-1/2" height="inherit">
            <SkeletonBox width="w-full" height="h-full" />
          </ContentBox>
          <ContentBox width="w-2/5" height="inherit">
            <SkeletonBox width="w-full" height="h-full" />
          </ContentBox>
        </div>
      </ContentBox>
    </div>
  );
}
