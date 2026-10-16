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

      <svg className="skyline" viewBox="0 0 1440 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <pattern id="pines-far" width="88" height="70" y="165" patternUnits="userSpaceOnUse">
            <g fill="#6f9bb8" opacity=".55">
              <path d="M22 0 33 22H27L37 42H30L40 62H4L14 42H7L17 22H11Z" />
              <path transform="translate(47 10) scale(.85)" d="M22 0 33 22H27L37 42H30L40 62H4L14 42H7L17 22H11Z" />
            </g>
          </pattern>
          <pattern id="pines-near" width="88" height="70" y="182" patternUnits="userSpaceOnUse">
            <g fill="#fff">
              <path d="M22 8 33 30H27L37 50H30L40 70H4L14 50H7L17 30H11Z" />
              <path transform="translate(50 14) scale(.8)" d="M22 8 33 30H27L37 50H30L40 70H4L14 50H7L17 30H11Z" />
            </g>
          </pattern>
        </defs>

        {/* Himalayan peaks with snow caps */}
        <path
          fill="#1c4566"
          d="M0 240V180L120 110 190 150 300 50 400 140 470 100 560 160 640 90 720 150 800 120 900 170 1000 130 1100 160 1200 100 1300 150 1440 120V240Z"
        />
        <path
          fill="#fff"
          opacity=".9"
          d="M300 50 267 80 283 76 300 90 316 76 333 80ZM640 90 611 115 626 111 640 124 655 111 673 115ZM1200 100 1158 125 1178 120 1200 136 1222 120 1250 125Z"
        />
        {/* Finnish pine forest */}
        <rect x="0" y="165" width="1440" height="75" fill="url(#pines-far)" />
        <rect x="0" y="182" width="1440" height="58" fill="url(#pines-near)" />
        <rect x="0" y="236" width="1440" height="4" fill="#fff" />
      </svg>

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
