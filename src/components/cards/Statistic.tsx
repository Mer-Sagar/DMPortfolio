import type { Statistic as StatisticType } from "@/types";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface StatisticProps {
  item: StatisticType;
}

export function Statistic({ item }: StatisticProps) {
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(reduce ? item.value : 0);

  useEffect(() => {
    if (reduce) {
      setValue(item.value);
      return;
    }
    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(item.value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [item.value, reduce]);

  return (
    <article className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:py-0 last:border-0">
      <p className="display-md text-ink">
        {item.prefix}
        {item.display ?? `${value}${item.suffix ?? ""}`}
      </p>
      <p className="mt-3 font-semibold">{item.label}</p>
      {item.description ? <p className="mt-1 text-sm text-muted">{item.description}</p> : null}
    </article>
  );
}

interface StatisticGridProps {
  items: StatisticType[];
  eyebrow?: string;
}

export function StatisticGrid({ items, eyebrow }: StatisticGridProps) {
  if (!items.length) return null;

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10 xl:px-14">
        {eyebrow ? <p className="eyebrow col-span-full border-b border-line py-5">{eyebrow}</p> : null}
        {items.map((item) => (
          <Statistic key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
