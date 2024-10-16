import Image from "next/image";
import logo from "../../public/sporran50x50.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="Piano Soft Logo" />
    </Link>
  );
}
