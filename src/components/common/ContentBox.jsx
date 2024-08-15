export default function ContentBox({
  children,
  width = "w-full",
  height = "h-full",
}) {
  return (
    <div
      className={`${width} ${height} border border-slate-200/10 rounded-md bg-slate-100/10`}
    >
      {children}
    </div>
  );
}
