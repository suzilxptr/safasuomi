import { useTranslation } from "react-i18next";

const items = [
  { id: "trusted", icon: "✅" },
  { id: "eco", icon: "🌿" },
  { id: "flexible", icon: "🗓️" },
  { id: "guarantee", icon: "⭐" },
] as const;

export default function About() {
  const { t } = useTranslation();
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <h2 className="reveal">{t("about.title")}</h2>
        <p className="section-sub reveal">{t("about.subtitle")}</p>
        <div className="grid grid-4">
          {items.map(({ id, icon }, i) => (
            <article
              key={id}
              className="card card-center reveal"
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="icon" aria-hidden="true">{icon}</div>
              <h3>{t(`about.items.${id}.title`)}</h3>
              <p>{t(`about.items.${id}.text`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
