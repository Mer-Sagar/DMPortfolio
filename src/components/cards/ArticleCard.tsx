import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/content";
import type { Article } from "@/types";

interface JournalLabels {
  title?: string;
  readLabel?: string;
  readShortLabel?: string;
  pdfLabel?: string;
  pdfShortLabel?: string;
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  compact?: boolean;
  labels?: JournalLabels;
}

function dateLabel(value: string) {
  return formatDate(value, site.locale).replace(/,/g, "").toUpperCase();
}

export function ArticleCard({ article, featured, compact, labels }: ArticleCardProps) {
  const readLabel = featured ? (labels?.readLabel ?? "Read Manuscript") : (labels?.readShortLabel ?? "Read");
  const pdfLabel = compact ? (labels?.pdfShortLabel ?? "PDF") : (labels?.pdfLabel ?? "Download PDF");

  if (featured || compact) {
    return (
      <article className={`flex h-full flex-col justify-between p-6 sm:p-8 ${featured ? "min-h-[22rem]" : ""}`}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{dateLabel(article.date)}</p>
          <h3 className={`mt-4 font-serif font-semibold leading-tight text-slate-900 ${featured ? "text-[1.65rem] sm:text-[2.05rem]" : "text-[1.25rem] sm:text-[1.4rem]"}`}>
            <Link to={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-slate-500">{article.excerpt}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            to={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-700"
          >
            {readLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {article.pdfUrl ? (
            <a
              href={article.pdfUrl}
              download
              className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-700 ${
                featured ? "rounded-full border border-sky-300 px-3 py-1.5" : ""
              }`}
            >
              <Download className="h-3.5 w-3.5" />
              {pdfLabel}
            </a>
          ) : null}
        </div>
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
        <Link to={`/articles/${article.slug}`}>{labels?.readShortLabel ?? "Read"}</Link>
        {article.pdfUrl ? (
          <a href={article.pdfUrl} download>
            {labels?.pdfLabel ?? "Download PDF"}
          </a>
        ) : null}
      </div>
    </article>
  );
}

interface ArticleGridProps {
  items: Article[];
  variant?: "default" | "journal";
  labels?: JournalLabels;
}

export function ArticleGrid({ items, variant = "default", labels }: ArticleGridProps) {
  if (!items.length) return null;
  const [first, ...rest] = items;

  if (variant === "journal") {
    return (
      <div className="overflow-hidden rounded-sm border border-slate-200 bg-[#f7f5ef]">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          {first ? (
            <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
              <ArticleCard article={first} featured labels={labels} />
            </div>
          ) : null}
          <div className="divide-y divide-slate-200">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} compact labels={labels} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {first ? <ArticleCard article={first} featured labels={labels} /> : null}
      <div>
        {rest.map((article) => (
          <ArticleCard key={article.id} article={article} labels={labels} />
        ))}
      </div>
    </div>
  );
}
