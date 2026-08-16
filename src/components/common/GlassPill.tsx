import type { ReactNode } from "react";

interface GlassPillProps {
  children: ReactNode;
  className?: string;
}

export function GlassPill({ children, className = "" }: GlassPillProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border border-[#d8c9a3]/60 bg-[#fffaf0]/94 text-[#102a2d] shadow-[0_18px_55px_rgba(16,42,45,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-2xl ${className}`}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,250,240,0.98)_0%,rgba(232,243,239,0.94)_38%,rgba(247,231,177,0.35)_100%)]" />
      <span className="pointer-events-none absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[#d6b76a]/28 blur-2xl" />
      <span className="pointer-events-none absolute -right-10 top-0 h-24 w-28 rounded-full bg-[#0f766e]/18 blur-2xl" />
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/90" />
      <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/55" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
