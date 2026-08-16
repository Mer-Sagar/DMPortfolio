import { ArticleGrid } from "@/components/cards/ArticleCard";
import { ProcessTimeline } from "@/components/cards/ProcessTimeline";
import { ProjectGrid } from "@/components/cards/ProjectCard";
import { ServiceGrid } from "@/components/cards/ServiceCard";
import { StatisticGrid } from "@/components/cards/Statistic";
import { TeamGrid } from "@/components/cards/TeamCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { HomeHero } from "@/components/sections/HomeHero";
import { Reveal } from "@/components/animations/Reveal";
import {
  articles,
  hasItems,
  home,
  isEnabled,
  projects,
  services,
  site,
  statistics,
  team,
  testimonials,
} from "@/lib/content";

export function HomePage() {
  const featuredMembers = team.members.filter((member) => member.featured);
  const teamPreview = featuredMembers.length ? featuredMembers : team.members.slice(0, 2);
  const featuredProjects = projects.items.slice(0, 2);
  const featuredArticles = articles.items.slice(0, 3);

  return (
    <>
      <SEO
        meta={home.seo}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.brand.name,
          description: site.brand.description,
          email: site.contact.email,
          telephone: site.contact.phone,
          address: site.contact.address,
        }}
      />
      {isEnabled(home.sections, "hero") ? <HomeHero hero={home.hero} /> : null}

      {isEnabled(home.sections, "highlights") && home.highlights && hasItems(home.highlights.items) ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeader title={home.highlights.title} description={home.highlights.description} />
            <div className="timeline mt-10 space-y-10 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
              {home.highlights.items.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.08}>
                  <article className="relative pl-8 md:pl-0">
                    <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-primary md:static md:mb-5 md:block" />
                    {item.eyebrow ? <p className="eyebrow">{item.eyebrow}</p> : null}
                    <h3 className="mt-3 font-sans text-2xl font-extrabold tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-muted">{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "pipeline") && home.pipeline && hasItems(home.pipeline.items) ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <SectionHeader title={home.pipeline.title} description={home.pipeline.description} />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {home.pipeline.items.map((item) => (
                <article key={item.id} className="rounded-[1.5rem] border border-line bg-surface p-6">
                  <p className="font-serif text-4xl text-accent">{item.letter}</p>
                  <h3 className="mt-6 font-serif text-3xl">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.description}</p>
                </article>
              ))}
            </div>
            {home.pipeline.badge ? <p className="mt-6 text-sm text-muted">{home.pipeline.badge}</p> : null}
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "midCta") ? <CTASection data={home.midCta} /> : null}

      {home.hero.background ? (
        <Container className="pb-16">
          <div className="media-frame aspect-[16/10] sm:aspect-[16/8]">
            <video src={home.hero.background} autoPlay muted loop playsInline />
          </div>
        </Container>
      ) : null}

      {isEnabled(home.sections, "statistics") && hasItems(statistics.items) ? (
        <StatisticGrid items={statistics.items} eyebrow={statistics.eyebrow} />
      ) : null}

      {isEnabled(home.sections, "philosophy") && home.philosophy ? (
        <section className="py-16 sm:py-24">
          <Container>
            <p className="eyebrow">{home.philosophy.eyebrow}</p>
            <h2 className="display-md mt-4 max-w-4xl">{home.philosophy.title}</h2>
            {home.philosophy.quote ? (
              <p className="mt-8 max-w-3xl font-serif text-2xl leading-snug text-muted">“{home.philosophy.quote}”</p>
            ) : null}
            {hasItems(home.philosophy.points) ? (
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {home.philosophy.points?.map((point) => (
                  <li key={point.id} className="border-t border-line pt-4">
                    <p className="text-xs tracking-[0.16em] text-muted">{point.number}</p>
                    <p className="mt-2 font-semibold">{point.title}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "services") && hasItems(services.items) ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <SectionHeader eyebrow={home.capabilitiesEyebrow} title={home.capabilitiesTitle} />
          </Container>
          <div className="mt-10">
            <ServiceGrid items={services.items.slice(0, 5)} variant="capability" />
          </div>
        </section>
      ) : null}

      {isEnabled(home.sections, "team") && hasItems(teamPreview) ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow={home.teamEyebrow} title={home.teamTitle} description={home.teamDescription} />
            <div className="mt-10">
              <TeamGrid members={teamPreview} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "reasons") && home.reasons && hasItems(home.reasons.items) ? (
        <section className="py-8 sm:py-16">
          <Container>
            <h2 className="display-md max-w-3xl">{home.reasons.title}</h2>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {home.reasons.items.map((item) => (
                <article key={item.id} className="grid gap-4 py-8 md:grid-cols-[4rem_1fr_auto] md:items-start">
                  <p className="font-serif text-3xl text-muted">{item.number}</p>
                  <div>
                    <h3 className="font-serif text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
                  </div>
                  {item.actionLabel ? <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.actionLabel}</p> : null}
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "process") && home.process && hasItems(home.process.steps) ? (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeader eyebrow={home.process.eyebrow} title={home.process.title} description={home.process.description} />
            <div className="mt-10">
              <ProcessTimeline steps={home.process.steps} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "projects") && hasItems(featuredProjects) ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <SectionHeader eyebrow="Projects" title="Selected engagements" />
            <div className="mt-10">
              <ProjectGrid items={featuredProjects} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "articles") && hasItems(featuredArticles) ? (
        <section className="pb-16 sm:pb-24">
          <Container>
            <SectionHeader eyebrow={home.articlesEyebrow} title={home.articlesTitle ?? "Journal"} />
            <div className="mt-10">
              <ArticleGrid items={featuredArticles} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "contact") ? (
        <section className="border-t border-line py-16">
          <Container className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow">{home.contactEyebrow}</p>
              <h2 className="mt-4 font-serif text-5xl">{site.contact.city}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow">Address</p>
                <p className="mt-3 text-muted">{site.contact.address}</p>
              </div>
              {site.workingHours[0] ? (
                <div>
                  <p className="eyebrow">{site.workingHours[0].label}</p>
                  <p className="mt-3 text-muted">{site.workingHours[0].value}</p>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "testimonials") && hasItems(testimonials.items) ? (
        <section className="pb-16">
          <Container>
            <SectionHeader title={testimonials.title} />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {testimonials.items.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "finalCta") ? <CTASection data={home.finalCta} dark /> : null}
    </>
  );
}
