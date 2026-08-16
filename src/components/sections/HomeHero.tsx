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
  return (
    <section>
      <Container className="pt-8 sm:pt-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="eyebrow">
            {site.brand.shortName} {hero.kickerLeft}
          </p>
          {hero.kickerRight ? <p className="eyebrow">{hero.kickerRight}</p> : null}
        </div>
        <Reveal>
          <h1 className="display mt-10 max-w-5xl">
            {hero.heading}{" "}
            {hero.highlightedHeading ? <span className="double-underline italic">{hero.highlightedHeading}</span> : null}
          </h1>
        </Reveal>
        {hero.description ? (
          <p className="mt-6 max-w-xl text-lg text-muted">{hero.description}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {hero.primaryCta ? <Button href={hero.primaryCta.href} label={hero.primaryCta.label} /> : null}
          {hero.secondaryCta ? (
            <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant="secondary" />
          ) : null}
        </div>
        {hero.note ? <p className="mt-6 max-w-xl text-sm text-muted">{hero.note}</p> : null}
      </Container>

      {hero.image ? (
        <Container className="mt-10 sm:mt-14">
          <div className="flex items-center justify-between pb-3">
            {hero.exhibitLabel ? <p className="eyebrow">{hero.exhibitLabel}</p> : null}
            {hero.exhibitMeta ? <p className="eyebrow">{hero.exhibitMeta}</p> : null}
          </div>
          <div className="overflow-hidden rounded-[1.6rem] border border-line">
            <ImageWithFallback src={hero.image} alt={hero.imageAlt ?? ""} className="aspect-[16/8] w-full object-cover" />
          </div>
        </Container>
      ) : null}

      {hero.metrics?.length ? (
        <Container className="mt-6">
          <div className="grid overflow-hidden rounded-[1.6rem] border border-line sm:grid-cols-2 lg:grid-cols-4">
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
