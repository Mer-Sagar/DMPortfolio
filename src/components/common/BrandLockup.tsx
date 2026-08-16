import { site } from "@/lib/content";

interface BrandLockupProps {
  compact?: boolean;
}

export function BrandLockup({ compact = false }: BrandLockupProps) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={site.brand.name}>
      <span className="relative h-[40px] w-[48px] shrink-0 overflow-visible bg-transparent sm:h-[46px] sm:w-[56px]">
        <img
          src={site.brand.mark}
          alt=""
          width={56}
          height={46}
          className="h-full w-full object-contain object-center"
        />
      </span>
      <span className="min-w-0">
        <span
          className={`block truncate font-black leading-[1.05] tracking-[-0.02em] text-[#102a2d] ${
            compact ? "max-w-[9.5rem] text-[13px] min-[390px]:max-w-[12rem] min-[390px]:text-[14px]" : "max-w-[210px] text-[15px]"
          }`}
        >
          {site.brand.name}
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-[8px] font-black uppercase tracking-[0.22em] text-[#5d6b6d] min-[390px]:text-[9px] min-[390px]:tracking-[0.32em] sm:mt-1">
          {site.brand.tagline}
        </span>
      </span>
    </div>
  );
}
