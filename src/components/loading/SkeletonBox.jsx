export default function SkeletonBox({ width, height }) {
  return (
    <div className={`bg-black ${width} ${height} shimmer rounded-md`}></div>
  );
}
