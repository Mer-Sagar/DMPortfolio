import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/common/Container";
import type { ReasonsData } from "@/types";

interface ReasonsObserveProps {
  data: ReasonsData;
}

export function ReasonsObserve({ data }: ReasonsObserveProps) {
  if (!data.items.length) return null;

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2 className="poster mx-auto max-w-5xl text-center">{data.title}</h2>
        </Reveal>
        <div className="mx-auto mt-6 h-px w-24 bg-slate-200" />
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className={index === 3 ? "lg:col-start-1" : ""}>
              <article className="relative min-h-[16rem] overflow-hidden">
                <span className="observe-num pointer-events-none absolute -right-1 -top-3 select-none" aria-hidden>
                  {item.number}
                </span>
                <ShieldCheck className="relative z-10 h-6 w-6 text-slate-800" strokeWidth={1.4} aria-hidden />
                <h3 className="relative z-10 mt-5 max-w-[14ch] font-serif text-[1.65rem] font-semibold leading-tight text-slate-900">
                  {item.title}
                </h3>
                <p className="relative z-10 mt-3 max-w-sm text-[15px] leading-relaxed text-slate-500">{item.description}</p>
                {item.actionLabel ? (
                  <p className="relative z-10 mt-6 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    {item.actionLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
