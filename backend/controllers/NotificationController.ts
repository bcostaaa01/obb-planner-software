import { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { Notification } from "../types/Notifications";

const supabase = createClient(
  "https://bwvbtyqrrbxcfybwovih.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3dmJ0eXFycmJ4Y2Z5YndvdmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyOTQxMTIsImV4cCI6MjA1Njg3MDExMn0.6XAyped2tbBELG9_fM1SrWVG-NEqUNronpOijcmRZxg"
);

// The controller layer is responsible for handling the requests and responses. It connects the service layer to the client.
export class NotificationController {
  async createdTripInterruptionNotification(req: Request, res: Response) {
    try {
      const { trip_id, message, type, severity } = req.body;
      const userId = req.body.user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const notification: Notification = {
        user_id: userId,
        trip_id: trip_id,
        message,
        severity,
        read: false,
        created_at: new Date(),
      };

      const { data, error } = await supabase
        .from("notifications")
        .insert(notification)
        .select()
        .single();

      if (error) throw error;

      res.status(200).json({
        message: "Notification created successfully",
        notification: data,
      });
    } catch (error) {
      console.error("Error creating notification:", error);
      res.status(500).json({
        message:
          "Failed to create notification for trip " +
          req.body.trip_id +
          " with user id " +
          req.body.user_id,
      });
    }
  }

  async getUserNotifications(req: Request, res: Response) {
    try {
      const userId = req.body.user_id;

      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

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

      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId)
        .eq("user_id", userId);

      if (error) throw error;

      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  }
}
