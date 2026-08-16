import { Link, useParams } from "react-router-dom";
import { Download } from "lucide-react";
import { Container } from "@/components/common/Container";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { SEO } from "@/components/common/SEO";
import { getArticle, site } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { NotFoundPage } from "@/pages/NotFound";

export function ArticleDetailPage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);

  if (!article) return <NotFoundPage />;

  return (
    <>
      <SEO
        meta={{
          title: article.title,
          description: article.excerpt,
          ogImage: article.coverImage,
        }}
      />
      <Container className="py-12 sm:py-16">
        <p className="eyebrow">
          {formatDate(article.date, site.locale)} · {article.category}
          {article.readingTime ? ` · ${article.readingTime}` : ""}
        </p>
        <h1 className="display-md mt-4 max-w-4xl">{article.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {article.author}
        </p>
        {article.pdfUrl ? (
          <a href={article.pdfUrl} download className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
            Download PDF <Download className="h-4 w-4" />
          </a>
        ) : null}
        {article.coverImage ? (
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-line">
            <ImageWithFallback src={article.coverImage} alt={article.title} className="aspect-[16/8] w-full object-cover" />
          </div>
        ) : null}
        <div className="mt-10 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
          {article.content.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        {article.tags?.length ? (
          <ul className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-12">
          <Link to="/articles" className="font-semibold">
            Back to journal
          </Link>
        </p>
      </Container>
    </>
  );
}
