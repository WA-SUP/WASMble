interface ContentBoxProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  bg?: string;
  borderColor?: string;
  custom?: string;
}

export default function ContentBox({
  children,
  width = "w-full",
  height = "h-auto",
  bg = "bg-inherit",
  borderColor = "border-slate-200/10",
  custom = "",
}: ContentBoxProps): React.JSX.Element {
  return (
    <div
      className={`p-3 ${width} ${height} border ${borderColor} rounded-md ${bg} ${custom}`}
    >
      {children}
    </div>
  );
}
