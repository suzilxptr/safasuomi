import type { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

// Nepali prayer-flag order: blue, white, red, green, yellow.
const FLAG_COLORS = ["#2563eb", "#f8fafc", "#dc2626", "#16a34a", "#facc15"];
const FLAGS = 15;

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section id="home" className="hero">
      <div className="aurora" aria-hidden="true" />
      <div className="stars" aria-hidden="true" />
      <div className="bubbles" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ "--i": i } as CSSProperties} />
        ))}
      </div>

      <div className="flags" aria-hidden="true">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0 0 Q500 200 1000 0" vectorEffect="non-scaling-stroke" />
        </svg>
        {Array.from({ length: FLAGS }, (_, i) => {
          const x = (i + 0.5) / FLAGS;
          return (
            <span
              key={i}
              style={
                {
                  left: `${x * 100}%`,
                  "--sag-f": 4 * x * (1 - x),
                  background: FLAG_COLORS[i % FLAG_COLORS.length],
                  animationDelay: `${-i * 0.45}s`,
                } as CSSProperties
              }
            />
          );
        })}
      </div>

      <div className="container hero-inner">
        <h1>{t("hero.title")}</h1>
        <p className="hero-text">{t("hero.subtitle")}</p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">{t("hero.cta")}</a>
          <a href="#services" className="btn btn-outline">{t("hero.secondary")}</a>
        </div>
      </div>
    </section>
  );
}
