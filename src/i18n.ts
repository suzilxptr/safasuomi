import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fi from "./locales/fi.json";

export const languages = ["fi", "en"] as const;
export type Language = (typeof languages)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, fi: { translation: fi } },
    supportedLngs: languages,
    fallbackLng: "fi",
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
  });

const syncDocument = (lng: string) => {
  document.documentElement.lang = lng;
  document.title = i18n.t("meta.title");
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", i18n.t("meta.description"));
};

i18n.on("languageChanged", syncDocument);
syncDocument(i18n.resolvedLanguage ?? "fi");

export default i18n;
