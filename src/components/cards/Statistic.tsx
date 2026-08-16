import type { Statistic as StatisticType } from "@/types";
import { useCountUp } from "@/hooks/useCountUp";

interface StatisticProps {
  item: StatisticType;
  featured?: boolean;
}

export function Statistic({ item, featured = false }: StatisticProps) {
  const { value, nodeRef } = useCountUp(item.value);
  const display = item.display ?? `${item.prefix ?? ""}${value}${item.suffix ?? ""}`;

  if (featured) {
    return (
      <article ref={nodeRef} className="relative py-4 pr-6">
        <span className="absolute left-0 top-3 h-8 w-8 border-l-2 border-t-2 border-sky-400/80" aria-hidden />
        <p className="pl-4 font-sans text-[clamp(4.2rem,3rem+6vw,7.5rem)] font-extrabold leading-[0.85] tracking-[-0.06em] text-slate-900">
          {display}
        </p>
        <p className="mt-5 max-w-md pl-4 text-[1.05rem] text-slate-700">
          <span className="font-serif italic">{item.label}</span>
          {item.description ? (
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              — {item.description}
            </span>
          ) : null}
        </p>
      </article>
    );
  }

  return (
    <article ref={nodeRef} className="border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:py-0 last:border-0">
      <p className="display-md text-ink">{display}</p>
      <p className="mt-3 font-semibold">{item.label}</p>
      {item.description ? <p className="mt-1 text-sm text-muted">{item.description}</p> : null}
    </article>
  );
}

interface StatisticGridProps {
  items: StatisticType[];
  eyebrow?: string;
  variant?: "strip" | "index";
}

export function StatisticGrid({ items, eyebrow, variant = "strip" }: StatisticGridProps) {
  if (!items.length) return null;

  if (variant === "index") {
    const [featured, ...rest] = items;
    return (
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-4 min-[390px]:px-5 sm:px-6 lg:px-10 xl:px-14">
          {eyebrow ? (
            <div className="mb-10 flex items-center gap-4">
              <p className="bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
                {eyebrow}
              </p>
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          ) : null}
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Statistic item={featured} featured />
            <div className="grid border-t border-slate-200 sm:grid-cols-2">
              {rest.map((item, index) => (
                <IndexCell key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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

function IndexCell({ item, index }: { item: StatisticType; index: number }) {
  const { value, nodeRef } = useCountUp(item.value);
  const display = item.display ?? `${item.prefix ?? ""}${value}${item.suffix ?? ""}`;

  return (
    <article
      ref={nodeRef}
      className={`px-5 py-8 ${index % 2 === 0 ? "sm:border-r sm:border-slate-200" : ""} ${
        index < 2 ? "border-b border-slate-200" : ""
      }`}
    >
      <p className="font-sans text-[clamp(2.4rem,2rem+1.6vw,3.4rem)] font-extrabold leading-none tracking-tight text-slate-900">
        {display}
      </p>
      <p className="mt-3 text-[12px] font-extrabold uppercase tracking-[0.14em] text-slate-800">{item.label}</p>
      {item.description ? (
        <p className="mt-2 font-serif text-[13px] italic leading-relaxed text-slate-400">{item.description}</p>
      ) : null}
    </article>
  );
}
