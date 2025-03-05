import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TripDetails from "../views/TripDetails.vue";
import NotFound from "../views/NotFound.vue";
import Cart from "../views/Cart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/trip-details",
      name: "trip-details",
      component: TripDetails,
    },
    {
      path: "/:pathMatch(.*)*",
      component: NotFound,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
  ],
});

export default router;
