import { useMemo, useState } from "react";
import { FilterBar } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { ProjectGrid } from "@/components/cards/ProjectCard";
import { PageHero } from "@/components/sections/PageHero";
import { projects } from "@/lib/content";

export function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(projects.categories[0] ?? "All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const haystack = [item.title, item.description, item.client, item.category].join(" ").toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [category, query]);

  return (
    <>
      <SEO meta={projects.seo} />
      <PageHero hero={projects.hero} />
      <Container className="pb-20">
        <div className="flex flex-col gap-4 lg:flex-row">
          <SearchInput value={query} onChange={setQuery} placeholder="Search projects" />
          <FilterBar items={projects.categories} active={category} onChange={setCategory} />
        </div>
        <div className="mt-10">
          {filtered.length ? <ProjectGrid items={filtered} /> : <p className="text-muted">No projects match that query.</p>}
        </div>
      </Container>
    </>
  );
}
