import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "../node_modules/flowbite-vue/dist/index.css";
import "flowbite/dist/flowbite.min.css";
import router from "./router";
import { createI18n } from "vue-i18n";
import de from "./locale/de.json";
import en from "./locale/en.json";
import { createPinia } from "pinia";

const i18n = createI18n({
  locale: "de",
  messages: {
    de,
    en,
  },
});

const pinia = createPinia();

createApp(App).use(router).use(i18n).use(pinia).mount("#app");
