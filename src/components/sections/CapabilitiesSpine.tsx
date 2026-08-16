import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { GoldWave } from "@/components/common/GoldWave";
import { Container } from "@/components/common/Container";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/types";

interface CapabilitiesSpineProps {
  eyebrow?: string;
  title?: string;
  items: Service[];
}

export function CapabilitiesSpine({ eyebrow, title, items }: CapabilitiesSpineProps) {
  const reduce = useReducedMotion();
  if (!items.length) return null;

  return (
    <section className="bg-white py-16 sm:py-24">
      <GoldWave />
      <Container>
        <div className="text-center">
          {eyebrow ? <h2 className="poster">{eyebrow}</h2> : null}
          {title ? <p className="serif-kicker mt-4">{title}</p> : null}
        </div>

        <div className="relative mx-auto mt-16 max-w-4xl">
          <motion.span
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-slate-200 md:block"
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <ul className="space-y-10 md:space-y-0">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);
              const left = index % 2 === 0;
              return (
                <li key={item.id} className="relative grid items-center md:grid-cols-2 md:py-10">
                  <motion.span
                    className="absolute left-1/2 top-1/2 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white shadow-[0_0_0_6px_rgba(226,232,240,0.7)] md:block"
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={reduce ? undefined : { scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 * index, type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <span className="absolute inset-[5px] rounded-full bg-slate-900" />
                  </motion.span>
                  <motion.div
                    className={`${left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}
                    initial={reduce ? false : { opacity: 0, x: left ? -36 : 36 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-8%" }}
                    transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/services/${item.slug}`} className={`inline-flex flex-col ${left ? "md:items-end" : "md:items-start"}`}>
                      <Icon className="mb-3 h-5 w-5 text-slate-900" aria-hidden />
                      <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{item.title}</h3>
                      <p className="mt-1 max-w-xs text-[13px] leading-relaxed text-slate-500">{item.shortDescription}</p>
                    </Link>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
      <GoldWave className="mt-16" />
    </section>
  );
}
