import { useMemo, useState } from "react";
import { FilterBar } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ServiceGrid } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { PageHero } from "@/components/sections/PageHero";
import { services } from "@/lib/content";

export function ServicesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(services.categories[0] ?? "All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return services.items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !needle ||
        [item.title, item.shortDescription, item.category, ...(item.features ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <>
      <SEO meta={services.seo} />
      <PageHero hero={services.hero} />

      {services.snapshot ? (
        <section className="pb-16">
          <Container className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div>
              <p className="eyebrow">Snapshot</p>
              <p className="mt-4 font-serif text-7xl">{services.snapshot.countLabel}</p>
              <p className="mt-2 text-sm text-muted">{services.snapshot.title}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.snapshot.items.map((item) => (
                <article key={item.id} className="border-t border-line pt-4">
                  <h3 className="font-serif text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {services.workflow ? (
        <section className="pb-16">
          <Container>
            <SectionHeader title={services.workflow.title} description={services.workflow.description} />
            {services.workflow.rhythm ? <p className="mt-6 max-w-3xl text-muted">{services.workflow.rhythm}</p> : null}
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {services.workflow.items.map((item) => (
                <article key={item.id} className="border border-line p-6">
                  <p className="eyebrow">{item.eyebrow}</p>
                  <h3 className="mt-4 font-serif text-3xl">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-10">
        <Container>
          <SectionHeader title={services.directoryTitle} description={services.directoryDescription} />
          <div className="mt-8">
            <ServiceGrid items={services.items} variant="capability" />
          </div>
        </Container>
      </section>

      <section id="explorer" className="pb-16 sm:pb-24">
        <Container>
          <SectionHeader title={services.explorerTitle} description={services.explorerDescription} />
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <SearchInput value={query} onChange={setQuery} placeholder={services.searchPlaceholder} />
            <div className="lg:max-w-none">
              <FilterBar items={services.categories} active={category} onChange={setCategory} />
            </div>
          </div>
          <div className="mt-8">
            {filtered.length ? <ServiceGrid items={filtered} variant="row" /> : <p className="text-muted">No services match that query.</p>}
          </div>
        </Container>
      </section>

      <CTASection data={services.cta} />
    </>
  );
}
