import { model } from 'mongoose';
import { INotificationGroupDocument } from './notificationGroup.types';
import { NotificationGroupSchema } from './notificationGroup.schema';

export const NotificationGroupModel = model<INotificationGroupDocument>('notificationGroup', NotificationGroupSchema);
