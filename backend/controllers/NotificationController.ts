import { Request, Response } from "express";
import { NotificationService, TripInterruption } from "../types/Notifications";

// The controller layer is responsible for handling the requests and responses. It connects the service layer to the client.
export class NotificationController {
  private service: NotificationService;

  async createdTripInterruptionNotification(req: Request, res: Response) {
    try {
      const interruption: TripInterruption = req.body;
      await this.service.createTripInterruptionNotifications(interruption);
      res
        .status(201)
        .json({ message: "Trip interruption notification created" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to create trip interruption notification" });
    }
  }

  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const notifications = await this.service.getUserNotifications(userId);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user notifications" });
    }
  }

  async markNotificationAsRead(req: Request, res: Response) {
    try {
      const notificationId = req.params.notificationId;
      await this.service.markNotificationAsRead(notificationId);
      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  }
}
