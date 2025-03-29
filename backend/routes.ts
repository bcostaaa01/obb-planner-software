import { Router } from "express";
import { NotificationController } from "./controllers/NotificationController";

// This function sets up the routes for the notification controller. These routes are cont
export const setupNotificationRoutes = (
  controller: NotificationController
): Router => {
  const router = Router();

  router.post(
    "/trip-interruption",
    controller.createdTripInterruptionNotification
  );
  router.get("/notifications/:userId", controller.getUserNotifications);
  router.put(
    "/notifications/:notificationId",
    controller.markNotificationAsRead
  );

  return router;
};
