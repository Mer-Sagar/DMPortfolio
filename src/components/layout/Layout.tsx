import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function Layout() {
  return (
    <div className="min-h-screen bg-background pt-2">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-secondary focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
