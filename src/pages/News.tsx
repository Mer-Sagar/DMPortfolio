import { useMemo, useState } from "react";
import { FilterBar } from "@/components/common/FilterBar";
import { SearchInput } from "@/components/common/SearchInput";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { PageHero } from "@/components/sections/PageHero";
import { articles } from "@/lib/content";

export function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(articles.categories[0] ?? "All");
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => {
    const set = new Set<string>();
    articles.items.forEach((item) => item.tags?.forEach((entry) => set.add(entry)));
    return ["All", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesTag = tag === "All" || item.tags?.includes(tag);
      const matchesQuery =
        !needle ||
        [item.title, item.excerpt, item.category, ...(item.tags ?? [])].join(" ").toLowerCase().includes(needle);
      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [category, query, tag]);

  return (
    <>
      <SEO meta={articles.seo} />
      <PageHero hero={articles.hero} />
      <Container className="pb-20">
        <div className="flex flex-col gap-4">
          <SearchInput value={query} onChange={setQuery} placeholder="Search journal" />
          <FilterBar items={articles.categories} active={category} onChange={setCategory} />
          {tags.length > 1 ? <FilterBar items={tags} active={tag} onChange={setTag} /> : null}
        </div>
        <div className="mt-10 space-y-6">
          {filtered.length ? (
            filtered.map((article, index) => (
              <ArticleCard key={article.id} article={article} featured={index === 0} />
            ))
          ) : (
            <p className="text-muted">No articles match that query.</p>
          )}
        </div>
      </Container>
    </>
  );
}
