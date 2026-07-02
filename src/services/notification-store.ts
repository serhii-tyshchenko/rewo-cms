type TNotification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
};

class NotificationStore {
  private notifications: TNotification[] = [];

  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.notifications;

  private emit() {
    this.listeners.forEach((listener) => listener());
  }

  show(notification: Omit<TNotification, 'id'>) {
    const id = crypto.randomUUID();

    this.notifications = [...this.notifications, { ...notification, id }];

    this.emit();

    return id;
  }

  success(message: string) {
    return this.show({ type: 'success', message });
  }

  successPersistent(message: string) {
    return this.show({ type: 'success', message });
  }

  error(message: string) {
    return this.show({ type: 'error', message });
  }

  errorPersistent(message: string) {
    return this.show({ type: 'error', message });
  }

  dismiss(id: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id,
    );

    this.emit();
  }

  dismissAll() {
    this.notifications = [];
    this.emit();
  }
}

export const notificationStore = new NotificationStore();

export const toast = {
  success: notificationStore.success.bind(notificationStore),
  error: notificationStore.error.bind(notificationStore),
  dismiss: notificationStore.dismiss.bind(notificationStore),
  dismissAll: notificationStore.dismissAll.bind(notificationStore),
};
