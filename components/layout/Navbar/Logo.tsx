import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none shrink-0">
      <Image
        src="/images/telecomLogo.png"
        alt="Connexxion Telecoms"
        width={198}
        height={100}
        priority
        className="h-fit w-fit object-contain"
      />
      {/* <span
        className="hidden sm:flex flex-col leading-none pl-2.5"
        style={{ borderLeft: "1px solid var(--border-2)" }}
      >
        <span
          className="text-[9px] font-bold tracking-[0.2em] uppercase pl-2.5"
          style={{ color: "#22c55e" }}
        >
          Telecoms
        </span>
        <span
          className="text-[8px] tracking-wide uppercase pl-2.5"
          style={{ color: "var(--text-4)" }}
        >
          Enterprise Connectivity
        </span>
      </span> */}
    </Link>
  );
}
