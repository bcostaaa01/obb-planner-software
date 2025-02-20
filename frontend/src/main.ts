import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "../node_modules/flowbite-vue/dist/index.css";
import "flowbite/dist/flowbite.min.css";
import router from "./router";

createApp(App).use(router).mount("#app");
