import { useTranslation } from "react-i18next";
import { company } from "../config";
import ContactForm from "./ContactForm";
import type { ServiceId } from "./Services";

type Props = { defaultService?: ServiceId; title?: string; subtitle?: string };

export default function Contact({ defaultService, title, subtitle }: Props) {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section section-alt">
      <div className="container contact-grid">
        <div className="reveal">
          <h2>{title ?? t("contact.title")}</h2>
          <p className="section-sub left">{subtitle ?? t("contact.subtitle")}</p>
          <ul className="contact-info">
            <li>
              <strong>{t("contact.info.phone")}</strong>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
            </li>
            <li>
              <strong>{t("contact.info.email")}</strong>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <strong>{t("contact.info.address")}</strong>
              <span>{company.address}</span>
            </li>
            <li>
              <strong>{t("contact.info.hours")}</strong>
              <span>{t("contact.info.hoursValue")}</span>
            </li>
          </ul>
        </div>

        <ContactForm defaultService={defaultService} />
      </div>
    </section>
  );
}
