import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { company } from "../config";
import { serviceIds } from "./Services";

type Status = "idle" | "sending" | "success" | "invalid" | "error";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus(res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="container contact-grid">
        <div className="reveal">
          <h2>{t("contact.title")}</h2>
          <p className="section-sub left">{t("contact.subtitle")}</p>
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

        <form className="form reveal" style={{ "--d": "120ms" } as React.CSSProperties} onSubmit={onSubmit}>
          <label>
            {t("contact.form.name")}
            <input name="name" type="text" required maxLength={100} autoComplete="name" />
          </label>
          <div className="form-row">
            <label>
              {t("contact.form.email")}
              <input name="email" type="email" required maxLength={254} autoComplete="email" />
            </label>
            <label>
              {t("contact.form.phone")}
              <input name="phone" type="tel" maxLength={30} autoComplete="tel" />
            </label>
          </div>
          <label>
            {t("contact.form.service")}
            <select name="service" defaultValue="">
              <option value="">{t("contact.form.servicePlaceholder")}</option>
              {serviceIds.map((id) => (
                <option key={id} value={t(`services.items.${id}.title`)}>
                  {t(`services.items.${id}.title`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("contact.form.message")}
            <textarea
              name="message"
              rows={5}
              required
              maxLength={5000}
              placeholder={t("contact.form.messagePlaceholder")}
            />
          </label>

          {/* Honeypot field for bots */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hp"
          />

          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
          </button>

          <div aria-live="polite">
            {status === "success" && <p className="msg msg-ok">{t("contact.form.success")}</p>}
            {status === "invalid" && <p className="msg msg-err">{t("contact.form.errorInvalid")}</p>}
            {status === "error" && <p className="msg msg-err">{t("contact.form.errorGeneric")}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
