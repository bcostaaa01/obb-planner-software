import {
  NotificationService,
  NotificationRepository,
  TripInterruption,
  Notification,
} from "../types/Notifications";

// The service layer is responsible for handling the business logic.
export class NotificationServiceImplementation implements NotificationService {
  private repository: NotificationRepository;

  async createTripInterruptionNotifications(
    interruption: TripInterruption
  ): Promise<void> {
    const notification = {
      tripId: interruption.tripId,
      message: interruption.message,
      severity: interruption.severity,
      userId: interruption.tripId,
      read: false,
      createdAt: new Date(),
    };

    await this.repository.create(notification);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.repository.findByUserId(userId);
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    return this.repository.markAsRead(notificationId);
  }
}
