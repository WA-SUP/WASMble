export default function ContentBox({
  children,
  width = "w-full",
  height = "h-full",
  bg = "bg-inherit",
  borderColor = "border-slate-200/10",
  custom = "",
}) {
  return (
    <div
      className={`p-3 ${width} ${height} border ${borderColor} rounded-md ${bg} ${custom}`}
    >
      {children}
    </div>
  );
}
