export default function ContentBox({
  children,
  width = "w-full",
  height = "h-full",
}) {
  return (
    <div
      className={`p-3 ${width} ${height} border border-slate-200/10 rounded-md bg-slate-100/10`}
    >
      {children}
    </div>
  );
}
