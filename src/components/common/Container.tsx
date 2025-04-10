interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({
  children,
}: ContainerProps): React.JSX.Element {
  return <div className="flex flex-col min-h-screen w-full">{children}</div>;
}
