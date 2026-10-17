import { useEffect, type CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { company } from "../config";
import Contact from "./Contact";
import { serviceIcons, serviceIds, type ServiceId } from "./Services";

type Area = { title: string; items: string[] };

const isServiceId = (id: string | undefined): id is ServiceId => serviceIds.some((s) => s === id);

export default function ServiceDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const valid = isServiceId(id);
  const title = valid ? t(`services.items.${id}.title`) : "";

  useEffect(() => {
    if (!valid) return;
    document.title = `${title} | ${company.name}`;
    return () => {
      document.title = i18n.t("meta.title");
    };
  }, [valid, title, i18n]);

  if (!valid) return <Navigate to="/" replace />;

  const base = `serviceDetail.pages.${id}`;
  const areas = t(`${base}.areas`, { returnObjects: true }) as unknown as Area[];
  const extras = t(`${base}.extras`, { returnObjects: true }) as unknown as string[];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Link to="/#services" className="back-link">← {t("serviceDetail.back")}</Link>
          <div className="page-hero-icon" aria-hidden="true">{serviceIcons[id]}</div>
          <h1>{title}</h1>
          <p>{t(`${base}.intro`)}</p>
          <a href="#contact" className="btn btn-primary">{t("hero.cta")}</a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal">{t("serviceDetail.includedTitle")}</h2>
          <p className="section-sub reveal">{t("serviceDetail.includedSub")}</p>
          <div className="grid grid-2">
            {areas.map((area, i) => (
              <article
                key={area.title}
                className="card reveal"
                style={{ "--d": `${(i % 2) * 80}ms` } as CSSProperties}
              >
                <h3>{area.title}</h3>
                <ul className="checklist">
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container detail-extras">
          <div className="reveal">
            <h2>{t("serviceDetail.extrasTitle")}</h2>
            <ul className="chips">
              {extras.map((extra) => (
                <li key={extra}>{extra}</li>
              ))}
            </ul>
          </div>
          <aside className="note reveal" style={{ "--d": "120ms" } as CSSProperties}>
            <h3>{t("serviceDetail.noteTitle")}</h3>
            <p>{t(`${base}.note`)}</p>
          </aside>
        </div>
      </section>

      <Contact
        defaultService={id}
        title={t("serviceDetail.contactTitle", { service: title })}
        subtitle={t("serviceDetail.contactSub")}
      />

      <section className="section">
        <div className="container">
          <h2 className="reveal">{t("serviceDetail.otherTitle")}</h2>
          <ul className="other-services reveal">
            {serviceIds
              .filter((s) => s !== id)
              .map((s) => (
                <li key={s}>
                  <Link to={`/services/${s}`}>
                    <span aria-hidden="true">{serviceIcons[s]}</span>
                    {t(`services.items.${s}.title`)}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
