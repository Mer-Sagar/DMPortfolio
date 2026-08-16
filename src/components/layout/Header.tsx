import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { navigation, site } from "@/lib/content";
import { visibleNavItems } from "@/lib/navigation";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const items = visibleNavItems();

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-full border border-line bg-secondary/90 px-3 py-2 shadow-[0_8px_40px_rgba(26,39,68,0.08)] backdrop-blur-md sm:px-5">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-full py-1 pr-2">
          <img src={site.brand.mark} alt="" className="h-10 w-10 shrink-0" />
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold leading-tight">{site.brand.name}</span>
            <span className="block truncate text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              {site.brand.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {items.map((item) => (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive ? "bg-background text-ink" : "text-muted hover:text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {navigation.cta ? (
            <div className="hidden sm:block">
              <Button href={navigation.cta.href} label={navigation.cta.label} className="!min-h-10 !px-4" />
            </div>
          ) : null}
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-secondary lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <MobileMenu open={open} items={items} id={panelId} />
    </header>
  );
}
