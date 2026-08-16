import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { site } from "@/lib/content";
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="pointer-events-auto mx-auto flex max-w-[1280px] items-center justify-between gap-3 rounded-full border border-white/70 bg-[#fffdf8]/90 px-3 py-2 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-4">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded-full py-1 pr-2" aria-label="Go home">
          <img src={site.brand.mark} alt="" className="h-11 w-auto shrink-0 object-contain" />
          <span className="min-w-0">
            <span className="block truncate text-[0.95rem] font-extrabold leading-tight tracking-tight text-[#0f172a]">
              {site.brand.name}
            </span>
            <span className="block truncate text-[0.62rem] uppercase tracking-[0.22em] text-muted">
              {site.brand.tagline}
            </span>
          </span>
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-secondary"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <MobileMenu open={open} items={items} id={panelId} />
    </header>
  );
}
