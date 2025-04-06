import { Router } from "express";
import { NotificationController } from "./controllers/NotificationController";
import { authenticateUser } from "./middleware/auth";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// This function sets up the routes for the notification controller. These routes are controlled by the NotificationController.
export const setupNotificationRoutes = (
  controller: NotificationController
): Router => {
  const router = Router();

  router.use(authenticateUser);

  router.post(
    "/trip-interruption",
    controller.createdTripInterruptionNotification
  );
  router.get("/", controller.getUserNotifications);
  router.put("/:notificationId", controller.markNotificationAsRead);

  return router;
};
