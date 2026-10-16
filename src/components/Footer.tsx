import { useTranslation } from "react-i18next";
import { company } from "../config";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>{company.name}</strong>
          <p>{t("footer.tagline")}</p>
        </div>
        <p>
          © {new Date().getFullYear()} {company.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
