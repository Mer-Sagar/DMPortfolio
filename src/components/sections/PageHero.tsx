import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { HeroData } from "@/types";

interface PageHeroProps {
  hero: HeroData;
}

export function PageHero({ hero }: PageHeroProps) {
  return (
    <section className="pb-12 pt-10 sm:pb-16 sm:pt-14">
      <Container>
        {hero.eyebrow ? <p className="eyebrow">{hero.eyebrow}</p> : null}
        <h1 className="display mt-5 max-w-5xl">
          {hero.heading}{" "}
          {hero.highlightedHeading ? <span className="double-underline italic">{hero.highlightedHeading}</span> : null}
        </h1>
        {hero.description ? <p className="mt-6 max-w-2xl text-lg text-muted">{hero.description}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">
          {hero.primaryCta ? <Button href={hero.primaryCta.href} label={hero.primaryCta.label} variant={hero.primaryCta.variant} /> : null}
          {hero.secondaryCta ? (
            <Button href={hero.secondaryCta.href} label={hero.secondaryCta.label} variant={hero.secondaryCta.variant ?? "secondary"} />
          ) : null}
        </div>
      </Container>
    </section>
  );
}
