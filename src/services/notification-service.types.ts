export type TNotification = {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  autoclose: boolean;
  delay: number;
};
