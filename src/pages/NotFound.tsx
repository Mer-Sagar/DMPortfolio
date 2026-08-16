import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { SEO } from "@/components/common/SEO";
import { pages } from "@/lib/content";

export function NotFoundPage() {
  const copy = pages.notFound;
  return (
    <>
      <SEO meta={{ title: "Not found", description: copy.description }} />
      <Container className="py-24">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="display mt-4">{copy.title}</h1>
        <p className="mt-5 max-w-xl text-muted">{copy.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={copy.primaryCta.href} label={copy.primaryCta.label} />
          <Button href={copy.secondaryCta.href} label={copy.secondaryCta.label} variant="secondary" />
        </div>
      </Container>
    </>
  );
}
