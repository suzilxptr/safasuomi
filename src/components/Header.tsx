import { useEffect, useState } from "react";
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark" aria-hidden="true">✦</span>
          {company.name}
        </a>

        <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
              {t(l.key)}
            </a>
          ))}
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
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
