import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProcessTimeline } from "@/components/cards/ProcessTimeline";
import { StatisticGrid } from "@/components/cards/Statistic";
import { TeamGrid } from "@/components/cards/TeamCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { about, hasItems, home, statistics, team } from "@/lib/content";

export function AboutPage() {
  const founders = team.members.filter((member) => member.featured);
  const support = team.members.filter((member) => !member.featured);

  return (
    <>
      <SEO meta={about.seo} />
      <PageHero hero={about.hero} />

      {about.origin ? (
        <section className="pb-16">
          <Container>
            <p className="eyebrow">{about.origin.eyebrow}</p>
            <p className="mt-6 max-w-4xl font-serif text-3xl leading-snug sm:text-5xl">“{about.origin.quote}”</p>
          </Container>
        </section>
      ) : null}

      {hasItems(about.milestones) ? (
        <section className="pb-16">
          <Container className="grid gap-6 md:grid-cols-3">
            {about.milestones?.map((item) => (
              <article key={item.id} className="border-t border-line pt-5">
                <h2 className="font-serif text-3xl">{item.title}</h2>
                <p className="mt-3 text-muted">{item.description}</p>
              </article>
            ))}
          </Container>
        </section>
      ) : null}

      {(about.mission || about.vision) && (
        <section className="pb-16">
          <Container className="grid gap-8 md:grid-cols-2">
            {about.mission ? (
              <div>
                <p className="eyebrow">Mission</p>
                <p className="mt-4 font-serif text-3xl">{about.mission}</p>
              </div>
            ) : null}
            {about.vision ? (
              <div>
                <p className="eyebrow">Vision</p>
                <p className="mt-4 font-serif text-3xl">{about.vision}</p>
              </div>
            ) : null}
          </Container>
        </section>
      )}

      {hasItems(founders) ? (
        <section className="pb-16">
          <Container>
            <SectionHeader eyebrow="Minds" title={team.foundersTitle} description={team.foundersDescription} />
            <div className="mt-10">
              <TeamGrid members={founders} />
            </div>
            {founders.map((member) =>
              member.fullBio ? (
                <article key={`${member.id}-bio`} className="mt-8 border-t border-line pt-6">
                  <h3 className="font-serif text-3xl">{member.name}</h3>
                  <p className="mt-2 text-sm text-muted">
                    {[member.credentials, member.experience].filter(Boolean).join(" / ")}
                  </p>
                  <p className="mt-4 max-w-3xl text-muted">{member.fullBio}</p>
                  {member.specialties?.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {member.specialties.map((item) => (
                        <li key={item} className="rounded-full border border-line px-3 py-1 text-xs">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ) : null,
            )}
          </Container>
        </section>
      ) : null}

      {hasItems(support) ? (
        <section className="pb-16">
          <Container>
            <SectionHeader title={team.supportTitle} description={team.supportDescription} />
            <div className="mt-10">
              <TeamGrid members={support} />
            </div>
          </Container>
        </section>
      ) : null}

      {about.values && hasItems(about.values.items) ? (
        <section className="pb-16">
          <Container>
            <SectionHeader eyebrow={about.values.eyebrow} title={about.values.title} />
            <div className="mt-10 divide-y divide-line border-y border-line">
              {about.values.items.map((item) => (
                <article key={item.id} className="grid gap-4 py-8 md:grid-cols-[4rem_1fr]">
                  <p className="font-serif text-3xl text-muted">{item.number}</p>
                  <div>
                    <h3 className="font-serif text-3xl">{item.title}</h3>
                    <p className="mt-3 text-muted">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {hasItems(statistics.items) ? <StatisticGrid items={statistics.items} /> : null}

      {home.process && hasItems(home.process.steps) ? (
        <section className="py-16">
          <Container>
            <SectionHeader title={home.process.title} description={home.process.description} />
            <div className="mt-10">
              <ProcessTimeline steps={home.process.steps} />
            </div>
          </Container>
        </section>
      ) : null}

      {about.audiences ? (
        <section className="pb-8">
          <Container>
            <h2 className="display-md max-w-4xl">{about.audiences.title}</h2>
            <p className="mt-5 max-w-3xl text-muted">{about.audiences.description}</p>
          </Container>
        </section>
      ) : null}

      <CTASection data={home.finalCta} />
    </>
  );
}
