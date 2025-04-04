export interface TripInterruption {
  trip_id: string;
  type: "DELAY" | "CANCELLATION" | "ROUTE_CHANGE";
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  timestamp: Date;
  user_id: string;
}

export interface Notification {
  id?: string;
  user_id: string;
  trip_id: string;
  message: string;
  severity: string;
  read: boolean;
  created_at: Date;
}

// This interface defines the methods that a repository must implement for the Notification model.
export interface NotificationRepository {
  create(notification: Notification): Promise<Notification>;
  findByUserId(userId: string): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
}

// This interface defines the methods that a service must implement for the Notification model.
export interface NotificationService {
  createTripInterruptionNotifications(
    interruption: TripInterruption
  ): Promise<void>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(notificationId: string): Promise<void>;
}
