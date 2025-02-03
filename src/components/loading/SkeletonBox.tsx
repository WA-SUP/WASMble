interface SkeletonBoxProps {
  width: string;
  height: string;
}

export default function SkeletonBox({
  width,
  height,
}: SkeletonBoxProps): React.JSX.Element {
  return (
    <div className={`bg-black ${width} ${height} shimmer rounded-md`}></div>
  );
}
