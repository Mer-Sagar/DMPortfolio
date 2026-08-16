import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import type { HomeCta } from "@/types";

interface CTASectionProps {
  data?: HomeCta;
  dark?: boolean;
}

export function CTASection({ data, dark }: CTASectionProps) {
  if (!data?.title) return null;

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className={dark ? "rounded-[2rem] bg-primary px-6 py-12 text-secondary sm:px-12 sm:py-16" : "rounded-[2rem] soft-panel px-6 py-12 sm:px-12 sm:py-16"}>
          <h2 className="display-md max-w-4xl">{data.title}</h2>
          {data.description ? (
            <p className={`mt-5 max-w-2xl ${dark ? "text-white/75" : "text-muted"}`}>{data.description}</p>
          ) : null}
          {data.tags?.length ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <li
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.14em] ${
                    dark ? "border-white/20" : "border-line"
                  }`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {data.primaryCta ? (
              <Button
                href={data.primaryCta.href}
                label={data.primaryCta.label}
                variant={dark ? "secondary" : "primary"}
              />
            ) : null}
            {data.note ? <p className={`text-sm ${dark ? "text-white/70" : "text-muted"}`}>{data.note}</p> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
