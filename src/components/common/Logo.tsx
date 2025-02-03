import Image from "next/image";
import Link from "next/link";

export default function Logo(): React.JSX.Element {
  return (
    <Link href="/">
      <Image
        src="/wasmble.png"
        alt="Wasmble Logo Image"
        width={200}
        height={100}
        priority
      />
    </Link>
  );
}
