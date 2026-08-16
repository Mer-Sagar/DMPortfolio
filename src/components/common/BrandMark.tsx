import { site } from "@/lib/content";

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <img
      src={site.brand.mark}
      alt=""
      width={44}
      height={44}
      className={`brand-mark ${className}`}
    />
  );
}
