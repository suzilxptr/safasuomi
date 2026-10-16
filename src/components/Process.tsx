import { useTranslation } from "react-i18next";

const steps = ["one", "two", "three", "four"] as const;

export default function Process() {
  const { t } = useTranslation();
  return (
    <section id="process" className="section">
      <div className="container">
        <h2 className="reveal">{t("process.title")}</h2>
        <ol className="grid grid-4 steps">
          {steps.map((s, i) => (
            <li
              key={s}
              className="step reveal"
              style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
            >
              <span className="step-num">{i + 1}</span>
              <h3>{t(`process.steps.${s}.title`)}</h3>
              <p>{t(`process.steps.${s}.text`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
