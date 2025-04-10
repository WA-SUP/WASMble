"use client";

import ContentBox from "@components/common/ContentBox";
import SkeletonBox from "@components/loading/SkeletonBox";

export default function Loading(): React.JSX.Element {
  return (
    <div className="flex flex-col justify-between p-3 w-full h-full">
      <ContentBox custom="flex flex-col justify-between items-center gap-4 h-full">
        <SkeletonBox width="w-full" height="h-1/2 flex-grow" />

        <div className="flex flex-row justify-around w-full flex-grow gap-4 min-h-0">
          <ContentBox width="w-1/2" height="h-full flex-grow">
            <SkeletonBox width="w-full" height="h-full" />
          </ContentBox>

          <ContentBox width="w-2/5" height="h-full flex-grow">
            <SkeletonBox width="w-full" height="h-full" />
          </ContentBox>
        </div>
      </ContentBox>
    </div>
  );
}
