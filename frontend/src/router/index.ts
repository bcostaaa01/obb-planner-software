import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TripDetails from "../views/TripDetails.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/trip-details",
      component: TripDetails,
    },
  ],
});

export default router;
