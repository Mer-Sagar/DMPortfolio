import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { GoldWave } from "@/components/common/GoldWave";
import type { HomeCta } from "@/types";

interface CTASectionProps {
  data?: HomeCta;
  dark?: boolean;
  variant?: "default" | "banner" | "clarity";
}

export function CTASection({ data, dark, variant = "default" }: CTASectionProps) {
  if (!data?.title) return null;

  if (variant === "banner") {
    return (
      <section className="bg-white py-10 sm:py-16">
        <Container>
          <div className="rounded-[1.75rem] bg-[#0a0c10] px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
            {data.eyebrow ? (
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">{data.eyebrow}</p>
            ) : null}
            <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.1rem,1.3rem+3.4vw,4.15rem)] font-semibold leading-[1.05] tracking-tight">
              {data.title}
            </h2>
            {data.description ? (
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">{data.description}</p>
            ) : null}
            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              {data.tags?.length ? (
                <ul className="flex flex-wrap gap-x-8 gap-y-3">
                  {data.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
                      <Check className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="lg:text-right">
                {data.primaryCta ? (
                  <Link
                    to={data.primaryCta.href}
                    className="text-[15px] font-semibold underline decoration-white/50 underline-offset-[6px] transition hover:decoration-white"
                  >
                    {data.primaryCta.label} →
                  </Link>
                ) : null}
                {data.note ? <p className="mt-2 text-sm text-white/45">{data.note}</p> : null}
              </div>
            </div>
          </div>
          <GoldWave className="mt-10" />
        </Container>
      </section>
    );
  }

  if (variant === "clarity") {
    return (
      <section className="bg-white py-20 sm:py-28">
        <Container className="text-center">
          <div className="mx-auto mb-8 grid h-11 w-11 place-items-center rounded-full border border-slate-300">
            <Sparkles className="h-4 w-4 text-slate-800" strokeWidth={1.5} aria-hidden />
          </div>
          <h2 className="poster mx-auto max-w-4xl">{data.title}</h2>
          {data.description ? (
            <p className="serif-kicker mx-auto mt-6 max-w-2xl">{data.description}</p>
          ) : null}
          {data.primaryCta ? (
            <Link
              to={data.primaryCta.href}
              className="mt-10 inline-flex items-center gap-2 bg-[#0a0f1a] px-8 py-4 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-white shadow-[5px_5px_0_0_#1e3a8a]"
            >
              {data.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </Container>
      </section>
    );
  }

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
