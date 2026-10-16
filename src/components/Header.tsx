import { useEffect, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { languages, type Language } from "../i18n";
import { company } from "../config";

const links = [
  { id: "services", key: "nav.services" },
  { id: "about", key: "nav.about" },
  { id: "process", key: "nav.process" },
  { id: "contact", key: "nav.contact" },
] as const;

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = (i18n.resolvedLanguage ?? "fi") as Language;

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const desktop = window.matchMedia("(min-width: 900px)");
    // Lock on <html>: overflow on <body> would turn it into the scroll container and break the sticky header.
    const root = document.documentElement;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", close);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", close);
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt={company.name} width="720" height="248" />
        </a>

        <nav id="main-nav" className={`nav ${open ? "nav-open" : ""}`} aria-label="Main">
          <div className="nav-links">
            {links.map((l, i) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                style={{ "--i": i } as CSSProperties}
                onClick={() => setOpen(false)}
              >
                {t(l.key)}
              </a>
            ))}
          </div>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label={t("nav.language")}>
            {languages.map((lng) => (
              <button
                key={lng}
                type="button"
                className={lng === current ? "active" : ""}
                aria-pressed={lng === current}
                onClick={() => i18n.changeLanguage(lng)}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="menu-toggle"
            aria-label={t("nav.menu")}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
