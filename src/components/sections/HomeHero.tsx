import { Button } from "@/components/common/Button";
import { ExhibitSeal } from "@/components/common/ExhibitSeal";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Reveal } from "@/components/animations/Reveal";
import { site } from "@/lib/content";
import type { HeroData } from "@/types";

interface HomeHeroProps {
  hero: HeroData;
}

export function HomeHero({ hero }: HomeHeroProps) {
  return (
    <section className="relative z-10 w-full overflow-hidden bg-white">
      <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-[var(--header-offset)] pb-5 min-[390px]:px-6">
          <p className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[9px] font-bold text-white">
              {site.brand.shortName}
            </span>
            <span className="truncate text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">
              {hero.kickerLeft}
            </span>
          </p>
          {hero.kickerRight ? (
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:block">
              {hero.kickerRight}
            </span>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 min-[390px]:px-6 sm:gap-14 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-32 lg:pt-24">
        <div className="flex flex-col">
          <Reveal>
            <h1 className="max-w-[16ch] text-[clamp(2.35rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-slate-900">
              <span className="block font-serif">{hero.heading}</span>
              {hero.highlightedHeading ? (
                <span className="double-underline inline-block pb-2 font-serif italic">{hero.highlightedHeading}</span>
              ) : null}
            </h1>
          </Reveal>
          {hero.description ? (
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-slate-500 sm:mt-8 sm:text-lg">
                {hero.description}
              </p>
            </Reveal>
          ) : null}
          <Reveal delay={0.14}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {hero.primaryCta ? (
                <Button
                  href={hero.primaryCta.href}
                  label={hero.primaryCta.label}
                  className="min-h-0 w-full px-8 py-4 sm:w-auto"
                />
              ) : null}
              {hero.secondaryCta ? (
                <Button
                  href={hero.secondaryCta.href}
                  label={hero.secondaryCta.label}
                  variant="secondary"
                  className="min-h-0 w-full border-slate-200 bg-white px-8 py-4 text-slate-700 sm:w-auto"
                />
              ) : null}
            </div>
          </Reveal>
          {hero.note ? (
            <p className="mt-8 hidden max-w-md border-t border-slate-200 pt-6 text-sm font-medium leading-relaxed text-slate-400 lg:block">
              {hero.note}
            </p>
          ) : null}
        </div>

        {(hero.video || hero.image) && (
          <div className="relative">
            <div className="flex items-center justify-between pb-3">
              {hero.exhibitLabel ? (
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{hero.exhibitLabel}</span>
              ) : null}
              {hero.exhibitMeta ? (
                <span className="hidden text-[11px] font-medium text-slate-300 sm:block">{hero.exhibitMeta}</span>
              ) : null}
            </div>
            <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/5 sm:aspect-[16/11]">
                {hero.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={hero.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={hero.image}
                  />
                ) : (
                  <ImageWithFallback
                    src={hero.image}
                    alt={hero.imageAlt ?? ""}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>
              {hero.seal ? <ExhibitSeal label={hero.seal} /> : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-dashed border-slate-200 pt-3">
              {hero.exhibitNote ? (
                <span className="text-xs font-medium text-slate-400">{hero.exhibitNote}</span>
              ) : (
                <span />
              )}
              {hero.badge ? (
                <span className="flex h-6 items-center rounded-full bg-blue-50 px-2.5 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                  {hero.badge}
                </span>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {hero.metrics?.length ? (
        <div className="relative z-10 border-y border-slate-200 bg-white">
          {hero.metricsLabel ? (
            <p className="py-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
              {hero.metricsLabel}
            </p>
          ) : null}
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-slate-200 border-t border-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
            {hero.metrics.map((metric) => (
              <article key={metric.label} className="px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                <p className="mt-4 font-sans text-[1.55rem] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-[1.75rem]">
                  {metric.value}
                </p>
                {metric.description ? <p className="mt-3 text-sm text-slate-500">{metric.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
