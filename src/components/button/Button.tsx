interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  text,
  onClick,
  className = "",
  type = "button",
}: ButtonProps): React.JSX.Element {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
