import {
  NotificationService,
  NotificationRepository,
  TripInterruption,
  Notification,
} from "../types/Notifications";

// The service layer is responsible for handling the business logic.
export class NotificationServiceImplementation implements NotificationService {
  private repository: NotificationRepository;

  constructor(repository: NotificationRepository) {
    this.repository = repository;
  }

  async createTripInterruptionNotifications(
    interruption: TripInterruption
  ): Promise<void> {
    const notification = {
      trip_id: interruption.trip_id,
      message: interruption.message,
      severity: interruption.severity,
      user_id: interruption.user_id,
      read: false,
      created_at: new Date(),
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
