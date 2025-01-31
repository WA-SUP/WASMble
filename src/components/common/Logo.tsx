import Image from "next/image";
import Link from "next/link";

import logo from "@public/wasmble.png";

export default function Logo() {
  return (
    <>
      <Link href="/">
        <Image src={logo} alt="Wasmble Logo Image" width={200} priority />
      </Link>
    </>
  );
}
