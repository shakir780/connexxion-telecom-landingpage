import { motion } from "framer-motion";

export function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-4 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 rounded-full origin-center"
        style={{ background: "var(--text-1)" }}
        animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block h-0.5 rounded-full"
        style={{ background: "var(--text-1)" }}
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 rounded-full origin-center"
        style={{ background: "var(--text-1)" }}
        animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
