import { Shield } from "lucide-react";

interface ExhibitSealProps {
  label: string;
}

export function ExhibitSeal({ label }: ExhibitSealProps) {
  const text = `${label.toUpperCase()}  •  `.repeat(2);

  return (
    <div className="pointer-events-none absolute -bottom-5 -left-4 z-[3] h-[5.5rem] w-[5.5rem] drop-shadow-lg sm:-bottom-6 sm:-left-6 sm:h-24 sm:w-24">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="49" fill="#102a2d" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#d6b76a" strokeWidth="1" />
        <defs>
          <path id="seal-circle" d="M50,50 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0" />
        </defs>
        <text fill="#f7f5f0" fontSize="8" fontWeight="700" letterSpacing="2">
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>
      <Shield className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[#d6b76a] sm:h-6 sm:w-6" strokeWidth={1.6} />
    </div>
  );
}
