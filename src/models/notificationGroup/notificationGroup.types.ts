import { Document } from 'mongoose';

type TStatus = 'common' | 'repeating';

export interface INotificationGroup {
  company: string;
  name: string;
  description?: string;
  created?: Date;
  type?: TStatus;
  failureMode?: string;
}

export interface INotificationGroupDocument extends INotificationGroup, Document {}
