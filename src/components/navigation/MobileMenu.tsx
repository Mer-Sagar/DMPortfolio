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
          className="pointer-events-auto fixed inset-0 z-40 bg-background/95 px-6 pt-24 backdrop-blur-md lg:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <nav className="mx-auto flex max-w-lg flex-col gap-2">
            {items.map((item) => (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-2xl px-2 py-3 font-serif text-4xl ${isActive ? "text-primary" : "text-ink"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {navigation.cta ? (
              <div className="pt-6">
                <Button href={navigation.cta.href} label={navigation.cta.label} />
              </div>
            ) : null}
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
