import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Reveal } from "@/components/animations/Reveal";
import { site } from "@/lib/content";
import type { HeroData } from "@/types";

interface HomeHeroProps {
  hero: HeroData;
}

export function HomeHero({ hero }: HomeHeroProps) {
  const ticker = hero.marquee ?? "ADVISORY VERIFIED  •  AUDIT READY  •  ";

  return (
    <section className="pt-[var(--header-offset)]">
      <Container>
        <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
          <p className="eyebrow flex min-w-0 items-center gap-2">
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-secondary">
              {site.brand.shortName}
            </span>
            <span className="truncate">{hero.kickerLeft}</span>
          </p>
          {hero.kickerRight ? <p className="eyebrow hidden shrink-0 sm:block">{hero.kickerRight}</p> : null}
        </div>
        <Reveal>
          <h1 className="display mt-8 max-w-5xl sm:mt-10">
            {hero.heading}{" "}
            {hero.highlightedHeading ? <span className="double-underline">{hero.highlightedHeading}</span> : null}
          </h1>
        </Reveal>
        {hero.description ? (
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-xl text-[0.98rem] text-muted sm:mt-6 sm:text-lg">{hero.description}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.14}>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            {hero.primaryCta ? <Button href={hero.primaryCta.href} label={hero.primaryCta.label} className="w-full sm:w-auto" /> : null}
            {hero.secondaryCta ? (
              <Button
                href={hero.secondaryCta.href}
                label={hero.secondaryCta.label}
                variant="secondary"
                className="w-full sm:w-auto"
              />
            ) : null}
          </div>
        </Reveal>
        {hero.note ? <p className="mt-5 max-w-xl text-sm text-muted sm:mt-6">{hero.note}</p> : null}
      </Container>

      {(hero.video || hero.image) && (
        <Container className="mt-8 sm:mt-14">
          <div className="flex items-center justify-between gap-3 pb-3">
            {hero.exhibitLabel ? <p className="eyebrow min-w-0 truncate">{hero.exhibitLabel}</p> : null}
            {hero.exhibitMeta ? <p className="eyebrow hidden shrink-0 sm:block">{hero.exhibitMeta}</p> : null}
          </div>
          <div className="media-frame aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7.2]">
            {hero.video ? (
              <video src={hero.video} autoPlay muted loop playsInline poster={hero.image} />
            ) : (
              <ImageWithFallback src={hero.image} alt={hero.imageAlt ?? ""} />
            )}
            <div className="absolute inset-x-0 bottom-0 z-[2] overflow-hidden gold-bar py-2 text-[0.58rem] font-semibold tracking-[0.18em] text-white sm:text-[0.65rem] sm:tracking-[0.22em]">
              <div className="marquee-track">
                <span className="px-6">{ticker.repeat(6)}</span>
                <span className="px-6">{ticker.repeat(6)}</span>
              </div>
            </div>
            {hero.badge ? (
              <span className="absolute right-3 top-3 z-[2] inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] sm:right-4 sm:top-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#c45c3e]" />
                {hero.badge}
              </span>
            ) : null}
          </div>
        </Container>
      )}

      {hero.metrics?.length ? (
        <Container className="mt-5 sm:mt-6">
          <div className="grid overflow-hidden rounded-[1.1rem] border border-line bg-surface/80 sm:grid-cols-2 sm:rounded-[1.6rem] lg:grid-cols-4">
            {hero.metrics.map((metric) => (
              <article key={metric.label} className="border-b border-line p-4 last:border-b-0 sm:border-r sm:p-5 lg:border-b-0">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{metric.label}</p>
                <p className="mt-3 font-serif text-xl sm:text-3xl">{metric.value}</p>
                {metric.description ? <p className="mt-2 text-sm text-muted">{metric.description}</p> : null}
              </article>
            ))}
          </div>
        </Container>
      ) : null}
    </section>
  );
}
