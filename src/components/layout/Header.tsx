import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import { BrandLockup } from "@/components/common/BrandLockup";
import { GlassPill } from "@/components/common/GlassPill";
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 py-3 min-[390px]:px-4 sm:px-5 sm:py-4">
      <div className="pointer-events-auto mx-auto w-full max-w-[1440px]">
        <div className="hidden w-full items-center justify-between gap-3 lg:flex">
          <GlassPill className="shrink-0 px-5 py-2">
            <Link to="/" className="flex-shrink-0" aria-label="Go home">
              <BrandLockup />
            </Link>
          </GlassPill>

          <GlassPill className="min-w-0 px-2 py-2">
            <div className="flex items-center gap-0.5 xl:gap-1">
              <nav className="flex max-w-full items-center overflow-x-auto" aria-label="Primary">
                {items.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    className={({ isActive }) =>
                      `relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-bold transition-colors duration-200 xl:px-4 xl:text-sm ${
                        isActive ? "bg-[#e7f4f0] text-[#0f766e]" : "text-[#334b4e] hover:text-[#0f766e]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
              {site.contact.phone ? (
                <a
                  href={`tel:${site.contact.phone}`}
                  className="ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8c9a3]/80 bg-white/90 text-[#102a2d] shadow-sm transition hover:border-[#0f766e] hover:text-[#0f766e]"
                  aria-label="Call"
                >
                  <Phone className="h-4 w-4" />
                </a>
              ) : null}
              {navigation.cta ? (
                <Link
                  to={navigation.cta.href}
                  className="ml-1 inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[#102a2d] px-5 text-sm font-black text-white shadow-md"
                >
                  {navigation.cta.label}
                </Link>
              ) : null}
            </div>
          </GlassPill>
        </div>

        <div className="w-full lg:hidden">
          <GlassPill className="px-3 py-2 min-[390px]:px-4">
            <div className="flex w-full items-center justify-between gap-2">
              <Link to="/" className="min-w-0" aria-label="Go home">
                <BrandLockup compact />
              </Link>
              <button
                ref={buttonRef}
                type="button"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d8c9a3]/80 bg-white/90 text-[#102a2d] shadow-sm backdrop-blur transition hover:border-[#0f766e] hover:text-[#0f766e]"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </GlassPill>
        </div>
      </div>
      <MobileMenu open={open} items={items} id={panelId} />
    </header>
  );
}
