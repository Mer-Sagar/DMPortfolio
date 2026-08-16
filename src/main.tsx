import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { applyTheme } from "@/lib/theme";
import { site } from "@/lib/content";
import "./styles/index.css";

applyTheme(site.theme);
document.title = site.brand.name;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
