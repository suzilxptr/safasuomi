import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const serviceIds = ["home", "office", "moveout", "window", "deep", "commercial"] as const;
export type ServiceId = (typeof serviceIds)[number];

export const serviceIcons: Record<ServiceId, string> = {
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
            <Link
              key={id}
              to={`/services/${id}`}
              className="card service-card reveal"
              style={{ "--d": `${i * 80}ms` } as CSSProperties}
            >
              <div className="icon" aria-hidden="true">{serviceIcons[id]}</div>
              <h3>{t(`services.items.${id}.title`)}</h3>
              <p>{t(`services.items.${id}.text`)}</p>
              <span className="card-more">{t("services.more")} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
