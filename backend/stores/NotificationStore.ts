import { Notification } from "../types";

// In-memory store for notifications
export class NotificationStore {
  private static notifications: Map<string, Notification[]> = new Map();

  static addNotification(userId: string, notification: Notification) {
    const userNotifications = this.notifications.get(userId) || [];
    userNotifications.push(notification);
    this.notifications.set(userId, userNotifications);
  }

  static getUserNotifications(userId: string): Notification[] {
    return this.notifications.get(userId) || [];
  }

  // Add some test data
  static initializeTestData() {
    const testData = [
      {
        userId: "123",
        notifications: [
          {
            id: "1",
            trip_id: "trip1",
            message: "Train delayed by 15 minutes",
            type: "DELAY",
            severity: "LOW",
            read: false,
            created_at: new Date(),
          },
          {
            id: "2",
            trip_id: "trip2",
            message: "Route changed due to maintenance",
            type: "ROUTE_CHANGE",
            severity: "MEDIUM",
            read: false,
            created_at: new Date(),
          },
        ],
      },
      {
        userId: "456",
        notifications: [
          {
            id: "3",
            trip_id: "trip3",
            message: "Trip cancelled due to weather",
            type: "CANCELLATION",
            severity: "HIGH",
            read: false,
            created_at: new Date(),
          },
        ],
      },
    ];

    // Initialize test data
    testData.forEach((userData) => {
      userData.notifications.forEach((notification) => {
        this.addNotification(
          userData.userId,
          notification as unknown as Notification
        );
      });
    });
  }
}
