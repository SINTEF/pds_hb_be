import { model } from 'mongoose';
import { INotificationDocument } from './notification.types';
import { NotificationSchema } from './notification.schema';

export const NotificationModel = model<INotificationDocument>('notification', NotificationSchema);
