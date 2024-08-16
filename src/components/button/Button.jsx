function Button({ text, onClick, className }) {
  return (
    <button type="button" className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
