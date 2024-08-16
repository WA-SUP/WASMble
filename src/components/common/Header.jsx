import Image from "next/image";

import logo from "@public/wasmble.png";

export default function Header() {
  return (
    <>
      <header className="mx-6 py-3 border-b border-slate-200/10">
        <div>
          <Image src={logo} alt="Wasmble Logo Image" width={200} priority />
        </div>
      </header>
    </>
  );
}
