import { Document } from 'mongoose';

type TStatus = 'common' | 'repeating';

export interface INotificationGroup {
  company: string;
  name: string;
  description?: string;
  created?: Date;
}

export interface INotificationGroupDocument extends INotificationGroup, Document {}
