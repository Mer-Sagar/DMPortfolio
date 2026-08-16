import { NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { navigation } from "@/lib/content";
import type { NavigationItem } from "@/types";

interface MobileMenuProps {
  open: boolean;
  items: NavigationItem[];
  id: string;
}

export function MobileMenu({ open, items, id }: MobileMenuProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="pointer-events-auto fixed inset-0 z-[55] overflow-y-auto bg-[#f7f5f0]/97 px-6 pt-28 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <nav className="mx-auto flex max-w-lg flex-col gap-1">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduce ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * index }}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `block rounded-2xl px-2 py-3 font-serif text-[2.1rem] leading-tight sm:text-5xl ${isActive ? "text-primary" : "text-ink"}`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
            {navigation.cta ? (
              <div className="pt-8">
                <Button href={navigation.cta.href} label={navigation.cta.label} />
              </div>
            ) : null}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
