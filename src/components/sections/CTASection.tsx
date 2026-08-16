import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { HomeCta } from "@/types";

interface CTASectionProps {
  data?: HomeCta;
}

export function CTASection({ data }: CTASectionProps) {
  if (!data?.title) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="rounded-[2rem] bg-primary px-6 py-12 text-secondary sm:px-12 sm:py-16">
          <h2 className="display-md max-w-4xl">{data.title}</h2>
          {data.description ? <p className="mt-5 max-w-2xl text-white/75">{data.description}</p> : null}
          {data.tags?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs tracking-[0.14em] uppercase">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {data.primaryCta ? (
              <Button href={data.primaryCta.href} label={data.primaryCta.label} variant="secondary" />
            ) : null}
            {data.note ? <p className="text-sm text-white/70">{data.note}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
