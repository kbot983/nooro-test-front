import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-background-dark">
      <div className="mx-4 flex h-[200px] items-center justify-center">
        <Link href="/">
          <Image
            src="/images/logo.png" // Replace with your rocket image path
            alt="Rocket Icon"
            className="mr-2 inline-block h-10"
            width={192}
            height={48}
            priority
          />
        </Link>
      </div>
    </div>
  );
}
