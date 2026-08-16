import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/common/Container";
import type { PhilosophyData } from "@/types";

interface EthosSectionProps {
  data: PhilosophyData;
}

export function EthosSection({ data }: EthosSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      {data.eyebrow ? (
        <p
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(5rem,18vw,14rem)] font-black uppercase tracking-[-0.06em] text-slate-100"
          aria-hidden
        >
          {data.eyebrow}
        </p>
      ) : null}
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <div>
            <Reveal>
              <h2 className="poster max-w-[11ch]">{data.title}</h2>
            </Reveal>
            {data.quote ? (
              <Reveal delay={0.1}>
                <blockquote className="mt-8 max-w-xl rounded-sm bg-[#f4f1ea] px-6 py-6 font-serif text-[1.15rem] leading-[1.65] text-slate-700 sm:text-[1.28rem]">
                  “{data.quote}”
                </blockquote>
              </Reveal>
            ) : null}
          </div>
          {data.points?.length ? (
            <ul className="relative border-l border-dashed border-slate-200 lg:pl-12">
              {data.points.map((point, index) => (
                <Reveal key={point.id} delay={index * 0.05}>
                  <li className="flex items-baseline gap-6 py-3">
                    {point.number ? (
                      <span className="w-12 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {point.number}
                      </span>
                    ) : null}
                    <span className="font-serif text-xl text-slate-800 sm:text-[1.35rem]">{point.title}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
