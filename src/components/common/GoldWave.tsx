import { motion, useReducedMotion } from "framer-motion";

interface GoldWaveProps {
  className?: string;
}

export function GoldWave({ className = "" }: GoldWaveProps) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={`w-full text-accent ${className}`}
      viewBox="0 0 1440 28"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0 16 C 160 6, 280 24, 440 14 S 720 4, 900 16 S 1160 26, 1440 10"
        stroke="currentColor"
        strokeWidth="1.25"
        initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
