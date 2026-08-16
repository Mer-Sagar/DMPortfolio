import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/common/Container";
import type { HighlightsData } from "@/types";

interface FilingCalendarProps {
  data: HighlightsData;
}

export function FilingCalendar({ data }: FilingCalendarProps) {
  if (!data.items.length) return null;

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.15rem,1.4rem+3.2vw,3.4rem)] font-semibold tracking-tight text-slate-900">
              {data.title}
            </h2>
          </Reveal>
          {data.description ? (
            <Reveal delay={0.08}>
              <p className="max-w-xs text-sm leading-relaxed text-slate-400 md:text-right">{data.description}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="relative mt-12 md:mt-16">
          <div className="absolute left-0 right-0 top-[5px] hidden h-px bg-slate-200 md:block" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {data.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.12}>
                <article className="relative">
                  <span className="relative z-10 mb-5 block h-2.5 w-2.5 rounded-full bg-slate-900" />
                  {item.eyebrow ? (
                    <p className="text-[13px] font-medium tracking-wide text-slate-400">{item.eyebrow}</p>
                  ) : null}
                  <h3 className="mt-2 text-[1.35rem] font-extrabold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-[1.7] text-slate-500">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
