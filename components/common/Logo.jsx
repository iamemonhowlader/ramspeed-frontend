import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="cr-logo flex items-center justify-center lg:justify-start"
    >
      <Image
        src="/logo.png"
        alt="logo"
        width={297}
        height={100}
        className="logo block h-auto w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[297px] max-h-[60px] sm:max-h-[80px] lg:max-h-[100px] object-contain"
      />
      <Image
        src="/logo.png"
        alt="logo"
        width={297}
        height={100}
        className="dark-logo hidden h-auto w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[297px] max-h-[60px] sm:max-h-[80px] lg:max-h-[100px] object-contain"
      />
    </Link>
  );
};

export default Logo;
