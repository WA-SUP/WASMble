interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({
  children,
}: ContainerProps): React.JSX.Element {
  return <div className="flex flex-col w-full h-full">{children}</div>;
}
