import { useTranslation } from "react-i18next";

export const serviceIds = ["home", "office", "moveout", "window", "deep", "commercial"] as const;

const icons: Record<(typeof serviceIds)[number], string> = {
  home: "🏠",
  office: "🏢",
  moveout: "📦",
  window: "🪟",
  deep: "🧽",
  commercial: "🏘️",
};

export default function Services() {
  const { t } = useTranslation();
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="reveal">{t("services.title")}</h2>
        <p className="section-sub reveal">{t("services.subtitle")}</p>
        <div className="grid grid-3">
          {serviceIds.map((id, i) => (
            <article
              key={id}
              className="card reveal"
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="icon" aria-hidden="true">{icons[id]}</div>
              <h3>{t(`services.items.${id}.title`)}</h3>
              <p>{t(`services.items.${id}.text`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
