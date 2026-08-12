"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE_OUT = "easeOut" as const;

/* ─────────────────────────────────────────────
   Client logos.

   Sources live in /public/images/clients. The
   raster files were pre-processed into white-ink
   transparent PNGs and the SVGs carry a single
   flat fill, so the monochrome tint in
   globals.css (.client-mark-mono) renders every
   one of them cleanly as white on the dark theme
   and black on the light one. Set `keepColor` to
   opt a logo out of that tint.

   `h` is per-client on purpose: a three-line
   lockup and a single-line wordmark scaled to the
   same box height look nothing alike, so each is
   sized for optical balance, not geometric.
───────────────────────────────────────────── */
type Client = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  h: string;
  keepColor?: boolean;
};

const CLIENTS: Client[] = [
  {
    id: "slb",
    label: "SLB",
    src: "/images/clients/slb.svg",
    width: 1020,
    height: 620,
    h: "h-8 sm:h-10",
  },
  {
    id: "nsib",
    label: "Nigerian Safety Investigation Bureau",
    src: "/images/clients/nsib.png",
    width: 541,
    height: 160,
    h: "h-8 sm:h-9",
  },
  {
    id: "huawei",
    label: "Huawei",
    src: "/images/clients/huawei.svg",
    width: 576,
    height: 98,
    h: "h-4 sm:h-5",
  },
  {
    id: "msi",
    label: "MSI Reproductive Choices Nigeria",
    src: "/images/clients/msi.png",
    width: 186,
    height: 160,
    h: "h-10 sm:h-12",
  },
  {
    id: "aym-shafa",
    label: "AYM Shafa",
    src: "/images/clients/aym-shafa.png",
    width: 424,
    height: 160,
    h: "h-8 sm:h-10",
  },
  {
    id: "plac",
    label: "Policy and Legal Advocacy Centre",
    src: "/images/clients/plac.png",
    width: 231,
    height: 160,
    h: "h-9 sm:h-11",
  },
];

/* The track scrolls by exactly half its width, so the visible strip is only
   covered for the whole cycle if that half is itself wider than the viewport.
   Six logos make one set roughly 1200px wide, so three sets per half keeps
   ultra-wide displays gap-free. */
const REPEAT = 6;

export default function TrustLine() {
  const marqueeItems = Array.from({ length: REPEAT }, () => CLIENTS).flat();

  return (
    <section
      aria-label="Trusted by top businesses and government agencies"
      className="relative"
      style={
        {
          background: "var(--bg-2)",
          borderBlock: "1px solid var(--border-2)",
        } as CSSProperties
      }
    >
      <div className="relative py-9 sm:py-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-8 px-4"
          style={{ color: "var(--text-3)" }}
        >
          Trusted By Top Businesses and Government Agencies in Nigeria
        </motion.p>

        <div className="marquee">
          <ul
            className="marquee-track"
            style={{ "--marquee-duration": "45s" } as CSSProperties}
          >
            {marqueeItems.map((client, i) => {
              // Only the first set is real content; the rest exist to fill the
              // loop, so they stay out of the accessibility tree and are
              // dropped entirely when motion is reduced.
              const isClone = i >= CLIENTS.length;
              return (
                <li
                  key={`${client.id}-${i}`}
                  data-clone={isClone ? "" : undefined}
                  aria-hidden={isClone || undefined}
                  className="client-mark shrink-0 px-7 sm:px-10 flex items-center"
                >
                  <Image
                    src={client.src}
                    alt={client.label}
                    title={client.label}
                    width={client.width}
                    height={client.height}
                    className={`${client.h} w-auto object-contain ${
                      client.keepColor ? "" : "client-mark-mono"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
