import { motion, useReducedMotion } from "framer-motion";
import { GoldWave } from "@/components/common/GoldWave";
import { Container } from "@/components/common/Container";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import type { TeamMember } from "@/types";

interface MindsPolaroidsProps {
  eyebrow?: string;
  title?: string;
  members: TeamMember[];
}

export function MindsPolaroids({ eyebrow, title, members }: MindsPolaroidsProps) {
  const reduce = useReducedMotion();
  if (!members.length) return null;

  return (
    <section className="overflow-x-clip bg-white py-16 sm:py-24">
      <GoldWave className="mb-12" />
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="flex items-start gap-4">
            <span className="mt-1 hidden h-[4.6rem] w-[3px] shrink-0 bg-slate-900 sm:block" aria-hidden />
            <div>
              {eyebrow ? <h2 className="poster">{eyebrow}</h2> : null}
              {title ? <p className="serif-kicker mt-5 max-w-sm">{title}</p> : null}
            </div>
          </div>
          <span className="mt-8 grid h-8 w-8 place-items-center rounded-full border border-slate-200" aria-hidden>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
          </span>
        </div>

        <div className="relative mx-auto h-[22rem] w-full max-w-lg sm:h-[26rem]">
          {members.slice(0, 2).map((member, index) => {
            const first = index === 0;
            const tilt = first ? -9 : 8;
            return (
              <motion.article
                key={member.id}
                className={`absolute w-[12.75rem] border-0 bg-white p-2.5 pb-8 shadow-[0_18px_45px_rgba(15,23,42,0.14)] outline-none sm:w-[14.5rem] ${
                  first ? "left-[8%] top-2 z-20 sm:left-[12%]" : "right-[4%] top-14 z-10 sm:right-[8%] sm:top-16"
                }`}
                style={{ rotate: tilt }}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduce ? undefined : { scale: 1.03, zIndex: 30, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                  {member.photo ? (
                    <ImageWithFallback
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover object-[center_18%]"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-serif text-4xl text-slate-300">{member.initials}</div>
                  )}
                </div>
                <p className="mt-3 text-center text-sm font-bold tracking-tight text-slate-900">{member.name}</p>
                <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {member.designation}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
