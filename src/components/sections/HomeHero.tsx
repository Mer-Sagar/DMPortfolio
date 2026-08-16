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
    <section className="pt-24 sm:pt-28">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="eyebrow flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-secondary">
              {site.brand.shortName}
            </span>
            {hero.kickerLeft}
          </p>
          {hero.kickerRight ? <p className="eyebrow">{hero.kickerRight}</p> : null}
        </div>
        <Reveal>
          <h1 className="display mt-10 max-w-5xl">
            {hero.heading}{" "}
            {hero.highlightedHeading ? <span className="double-underline">{hero.highlightedHeading}</span> : null}
          </h1>
        </Reveal>
        {hero.description ? (
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-lg text-muted">{hero.description}</p>
          </Reveal>
        ) : null}
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-wrap gap-3">
            {hero.primaryCta ? <Button href={hero.primaryCta.href} label={hero.primaryCta.label} /> : null}
            {hero.secondaryCta ? (
              <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="secondary" />
            ) : null}
          </div>
        </Reveal>
        {hero.note ? <p className="mt-6 max-w-xl text-sm text-muted">{hero.note}</p> : null}
      </Container>

      {(hero.video || hero.image) && (
        <Container className="mt-10 sm:mt-14">
          <div className="flex items-center justify-between pb-3">
            {hero.exhibitLabel ? <p className="eyebrow">{hero.exhibitLabel}</p> : null}
            {hero.exhibitMeta ? <p className="eyebrow">{hero.exhibitMeta}</p> : null}
          </div>
          <div className="media-frame relative aspect-[16/9] sm:aspect-[16/7.2]">
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
              <ImageWithFallback src={hero.image} alt={hero.imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
            )}
            <div className="absolute inset-x-0 bottom-0 gold-bar py-2 text-[0.65rem] font-semibold tracking-[0.22em] text-white">
              <div className="marquee-track">
                <span className="px-6">{ticker.repeat(6)}</span>
                <span className="px-6">{ticker.repeat(6)}</span>
              </div>
            </div>
            {hero.badge ? (
              <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#c45c3e]" />
                {hero.badge}
              </span>
            ) : null}
          </div>
        </Container>
      )}

      {hero.metrics?.length ? (
        <Container className="mt-6">
          <div className="grid overflow-hidden rounded-[1.6rem] border border-line bg-surface/80 sm:grid-cols-2 lg:grid-cols-4">
            {hero.metrics.map((metric) => (
              <article key={metric.label} className="border-b border-line p-5 last:border-b-0 sm:border-r lg:border-b-0">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{metric.label}</p>
                <p className="mt-3 font-serif text-2xl sm:text-3xl">{metric.value}</p>
                {metric.description ? <p className="mt-2 text-sm text-muted">{metric.description}</p> : null}
              </article>
            ))}
          </div>
        </Container>
      ) : null}
    </section>
  );
}
