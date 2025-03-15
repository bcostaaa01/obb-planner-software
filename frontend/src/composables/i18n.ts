import { createI18n } from "vue-i18n";
import en from "../locale/en.json";
import de from "../locale/de.json";

const i18n = createI18n({
  locale: "de",
  globalInjection: true,
  messages: {
    en: en,
    de: de,
  },
});

export default i18n;
