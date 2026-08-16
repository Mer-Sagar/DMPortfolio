import { site } from "@/lib/content";

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <span className={`relative inline-block h-[46px] w-[56px] shrink-0 ${className}`}>
      <img
        src={site.brand.mark}
        alt=""
        width={56}
        height={46}
        className="h-full w-full object-contain object-center"
      />
    </span>
  );
}
