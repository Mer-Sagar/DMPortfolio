import { ArticleGrid } from "@/components/cards/ArticleCard";
import { ProjectGrid } from "@/components/cards/ProjectCard";
import { StatisticGrid } from "@/components/cards/Statistic";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CapabilitiesSpine } from "@/components/sections/CapabilitiesSpine";
import { CTASection } from "@/components/sections/CTASection";
import { DocumentRoute } from "@/components/sections/DocumentRoute";
import { EthosSection } from "@/components/sections/EthosSection";
import { FilingCalendar } from "@/components/sections/FilingCalendar";
import { HomeHero } from "@/components/sections/HomeHero";
import { MindsPolaroids } from "@/components/sections/MindsPolaroids";
import { ProcessStages } from "@/components/sections/ProcessStages";
import { ReasonsObserve } from "@/components/sections/ReasonsObserve";
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
  const homeCapabilities = services.items.filter((item) => item.featuredOnHome);
  const capabilityItems = homeCapabilities.length ? homeCapabilities : services.items.slice(0, 5);

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
        <FilingCalendar data={home.highlights} />
      ) : null}

      {isEnabled(home.sections, "pipeline") && home.pipeline && hasItems(home.pipeline.items) ? (
        <DocumentRoute data={home.pipeline} />
      ) : null}

      {isEnabled(home.sections, "midCta") ? <CTASection data={home.midCta} variant="banner" /> : null}

      {home.hero.background ? (
        <Container className="bg-white pb-16">
          <div className="media-frame aspect-[16/10] sm:aspect-[16/8]">
            <video src={home.hero.background} autoPlay muted loop playsInline />
          </div>
        </Container>
      ) : null}

      {isEnabled(home.sections, "statistics") && hasItems(statistics.items) ? (
        <StatisticGrid items={statistics.items} eyebrow={statistics.eyebrow} variant="index" />
      ) : null}

      {isEnabled(home.sections, "philosophy") && home.philosophy ? <EthosSection data={home.philosophy} /> : null}

      {isEnabled(home.sections, "services") && hasItems(capabilityItems) ? (
        <CapabilitiesSpine
          eyebrow={home.capabilitiesEyebrow}
          title={home.capabilitiesTitle}
          items={capabilityItems}
        />
      ) : null}

      {isEnabled(home.sections, "team") && hasItems(teamPreview) ? (
        <MindsPolaroids eyebrow={home.teamEyebrow} title={home.teamTitle} members={teamPreview} />
      ) : null}

      {isEnabled(home.sections, "reasons") && home.reasons && hasItems(home.reasons.items) ? (
        <ReasonsObserve data={home.reasons} />
      ) : null}

      {isEnabled(home.sections, "process") && home.process && hasItems(home.process.steps) ? (
        <ProcessStages data={home.process} />
      ) : null}

      {isEnabled(home.sections, "projects") && hasItems(featuredProjects) ? (
        <section className="bg-white pb-16 sm:pb-24">
          <Container>
            <SectionHeader eyebrow="Projects" title="Selected engagements" />
            <div className="mt-10">
              <ProjectGrid items={featuredProjects} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "articles") && hasItems(featuredArticles) ? (
        <section className="bg-white pb-16 sm:pb-24">
          <Container>
            <SectionHeader eyebrow={home.articlesEyebrow} title={home.articlesTitle ?? "Journal"} />
            <div className="mt-10">
              <ArticleGrid items={featuredArticles} />
            </div>
          </Container>
        </section>
      ) : null}

      {isEnabled(home.sections, "contact") ? (
        <section className="border-t border-line bg-white py-16">
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
        <section className="bg-white pb-16">
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
