import Logo from "./Logo";
import GuideButton from "@components/guide/GuideButton";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center mx-6 py-3 border-b border-slate-200/10">
        <Logo />
        <GuideButton />
      </header>
    </>
  );
}
