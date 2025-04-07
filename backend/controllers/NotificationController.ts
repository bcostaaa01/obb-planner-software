import { Request, Response } from "express";
import { NotificationService } from "types";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// The controller layer is responsible for handling the requests and responses. It connects the service layer to the client.
export class NotificationController {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  async createTripInterruptionNotification(req: Request, res: Response) {
    try {
      const { trip_id, message, type, severity } = req.body;
      const userId = req.body.user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const timestamp = new Date();

      await this.notificationService.createTripInterruptionNotifications({
        trip_id,
        message,
        severity,
        user_id: userId,
        type,
        timestamp,
      });

      res.status(200).json({
        message: "Notification created successfully",
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({
        message: "Failed to create notification",
      });
    }
  }

  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.body.user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const data = await this.notificationService.getUserNotifications(userId);

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to get user notifications" });
    }
  }

  async markNotificationAsRead(req: Request, res: Response) {
    try {
      const notificationId = req.params.notificationId;
      const userId = req.body.user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      await this.notificationService.markNotificationAsRead(notificationId);

      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  }
}
