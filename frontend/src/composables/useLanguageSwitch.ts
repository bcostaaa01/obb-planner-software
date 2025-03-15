import { ref } from "vue";
import { useI18n } from "vue-i18n";
import enFlag from "../assets/en.png";
import deFlag from "../assets/de.png";
import router from "../router";

export function useLanguageSwitch() {
  const { locale } = useI18n();

  const languages = [
    {
      code: "en",
      label: "English",
      icon: enFlag,
    },
    {
      code: "de",
      label: "Deutsch",
      icon: deFlag,
    },
  ];

  const currentLanguage = ref(
    languages.find((lang) => lang.code === locale.value) || languages[0]
  );
  const dropdownOpen = ref(false);

  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };

  const changeLanguage = (code: string) => {
    locale.value = code;
    currentLanguage.value =
      languages.find((lang) => lang.code === code) || languages[0];
    dropdownOpen.value = false;
    router.push({ params: { locale: code } });
  };

  return {
    languages,
    currentLanguage,
    dropdownOpen,
    toggleDropdown,
    changeLanguage,
  };
}
