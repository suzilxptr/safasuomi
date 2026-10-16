import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="home" className="hero">
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />
      <div className="bubbles" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="container hero-inner">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">{t("hero.cta")}</a>
          <a href="#services" className="btn btn-outline">{t("hero.secondary")}</a>
        </div>
      </div>
    </section>
  );
}
