import { createRouter, createWebHistory, RouterView } from "vue-router";
import Home from "../views/Home.vue";
import TripDetails from "../views/TripDetails.vue";
import NotFound from "../views/NotFound.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import i18n from "../composables/i18n";

const routes = [
  {
    path: "/:locale?",
    component: RouterView,
    children: [
      { path: "", component: Home },
      { path: "trip-details", component: TripDetails },
      { path: "cart", component: Cart },
      { path: "checkout", component: Checkout },
    ],
  },
  {
    path: "/",
    redirect: `/${i18n.global.locale}`,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const locale = to.params.locale as string;

  console.log("Navigating to:", to.fullPath);
  console.log("Language detected:", locale);

  if (locale && (locale === "en" || locale === "de")) {
    i18n.global.locale = locale as "de" | "en";
  } else {
    i18n.global.locale = "de";
  }

  next();
});

export default router;
