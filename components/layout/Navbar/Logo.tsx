import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none shrink-0">
      {/* Sized by height with w-auto: the old h-fit/w-fit pair rendered the
          image at its declared 198x100 while the file was 198x66, stretching
          it and tripping next/image's aspect-ratio warning. */}
      <Image
        src="/images/connexxion-logo.png"
        alt="Connexxion Telecom & Solutions"
        width={747}
        height={182}
        priority
        className="h-10 sm:h-12 w-auto object-contain"
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
