export interface TripInterruption {
    tripId: string;
    type: 'DELAY' | 'CANCELLATION' | 'ROUTE_CHANGE';
    message: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    timestamp: Date;
  }
  
  export interface Notification {
    id?: string;
    userId: string;
    tripId: string;
    message: string;
    severity: string;
    read: boolean;
    createdAt: Date;
  }
  
  export interface NotificationRepository {
    create(notification: Notification): Promise<Notification>;
    findByUserId(userId: string): Promise<Notification[]>;
    markAsRead(id: string): Promise<void>;
  }
  
  export interface NotificationService {
    createTripInterruptionNotifications(interruption: TripInterruption): Promise<void>;
    getUserNotifications(userId: string): Promise<Notification[]>;
    markNotificationAsRead(notificationId: string): Promise<void>;
  }