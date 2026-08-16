import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/content";
import type { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="grid gap-6 border border-line bg-surface p-6 lg:grid-cols-[1.3fr_1fr] lg:p-10">
        <div>
          <p className="eyebrow">{formatDate(article.date, site.locale)}</p>
          <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl">
            <Link to={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-2xl text-muted">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={`/articles/${article.slug}`} className="group inline-flex items-center gap-2 text-sm font-semibold">
              Read Manuscript <ArrowRight className="h-4 w-4" />
            </Link>
            {article.pdfUrl ? (
              <a href={article.pdfUrl} className="inline-flex items-center gap-2 text-sm text-muted" download>
                Download PDF <Download className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
        <p className="self-end text-sm uppercase tracking-[0.16em] text-muted">{article.category}</p>
      </article>
    );
  }

  return (
    <article className="border-t border-line py-6">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">
        {formatDate(article.date, site.locale)} · {article.category}
      </p>
      <h3 className="mt-3 font-serif text-2xl leading-tight">
        <Link to={`/articles/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-muted">{article.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
        <Link to={`/articles/${article.slug}`}>Read</Link>
        {article.pdfUrl ? (
          <a href={article.pdfUrl} download>
            Download PDF
          </a>
        ) : null}
      </div>
    </article>
  );
}

interface ArticleGridProps {
  items: Article[];
}

export function ArticleGrid({ items }: ArticleGridProps) {
  if (!items.length) return null;
  const [first, ...rest] = items;
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {first ? <ArticleCard article={first} featured /> : null}
      <div>{rest.map((article) => <ArticleCard key={article.id} article={article} />)}</div>
    </div>
  );
}
