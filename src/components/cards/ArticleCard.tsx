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
  showDate?: boolean;
}

function dateLabel(value: string) {
  return formatDate(value, site.locale).replace(/,/g, "").toUpperCase();
}

function ActionPill({
  href,
  label,
  download,
  icon,
}: {
  href: string;
  label: string;
  download?: boolean;
  icon?: "arrow" | "download";
}) {
  const classes =
    "inline-flex items-center gap-2 rounded-full border border-slate-300 bg-transparent px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700 transition hover:border-slate-900 hover:text-slate-900";
  const content = (
    <>
      {icon === "download" ? <Download className="h-3.5 w-3.5" /> : null}
      <span>{label}</span>
      {icon === "arrow" ? <ArrowRight className="h-3.5 w-3.5" /> : null}
    </>
  );

  if (download) {
    return (
      <a href={href} download className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}

export function ArticleCard({ article, featured, compact, labels, showDate = true }: ArticleCardProps) {
  const readLabel = featured ? (labels?.readLabel ?? "Read Manuscript") : (labels?.readShortLabel ?? "Read");
  const pdfLabel = compact ? (labels?.pdfShortLabel ?? "PDF") : (labels?.pdfLabel ?? "Download PDF");

  if (featured) {
    return (
      <article className="flex h-full min-h-[24rem] flex-col justify-between p-7 sm:p-10">
        <div>
          {showDate ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{dateLabel(article.date)}</p>
          ) : null}
          <h3 className="mt-5 font-serif text-[clamp(1.55rem,1.2rem+1.4vw,2.15rem)] font-semibold leading-[1.2] text-slate-900">
            <Link to={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          <p className="mt-5 max-w-xl text-[14px] leading-[1.7] text-slate-500">{article.excerpt}</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ActionPill href={`/articles/${article.slug}`} label={readLabel} icon="arrow" />
          {article.pdfUrl ? <ActionPill href={article.pdfUrl} label={pdfLabel} download icon="download" /> : null}
        </div>
      </article>
    );
  }

  if (compact) {
    return (
      <article className="flex h-full flex-col justify-between p-7 sm:p-8">
        <div>
          {showDate ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{dateLabel(article.date)}</p>
          ) : null}
          <h3 className={`font-serif text-[1.2rem] font-semibold leading-[1.25] text-slate-900 sm:text-[1.35rem] ${showDate ? "mt-4" : ""}`}>
            <Link to={`/articles/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-4 text-[13px] leading-[1.65] text-slate-500">{article.excerpt}</p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
          <Link to={`/articles/${article.slug}`} className="inline-flex items-center gap-1 hover:text-slate-900">
            {readLabel} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {article.pdfUrl ? (
            <a href={article.pdfUrl} download className="inline-flex items-center gap-1.5 hover:text-slate-900">
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
  const [first, second, third, ...rest] = items;

  if (variant === "journal") {
    return (
      <div className="overflow-hidden border border-slate-200 bg-[#f8f7f2]">
        <div className="grid lg:grid-cols-2">
          {first ? (
            <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
              <ArticleCard article={first} featured labels={labels} />
            </div>
          ) : null}
          <div className="grid divide-y divide-slate-200 lg:grid-rows-2">
            {second ? <ArticleCard article={second} compact labels={labels} showDate={false} /> : null}
            {third ? <ArticleCard article={third} compact labels={labels} showDate /> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {first ? <ArticleCard article={first} featured labels={labels} /> : null}
      <div>
        {[second, third, ...rest].filter(Boolean).map((article) => (
          <ArticleCard key={article!.id} article={article!} labels={labels} />
        ))}
      </div>
    </div>
  );
}
