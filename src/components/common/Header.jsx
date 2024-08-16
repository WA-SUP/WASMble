import Logo from "./Logo";

export default function Header() {
  return (
    <>
      <header className="flex items-center mx-6 py-3 border-b border-slate-200/10">
        <Logo />
      </header>
    </>
  );
}
