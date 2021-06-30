import { Document } from 'mongoose';

type TStatus = 'published' | 'approved' | 'not approved' | 'not reviewed';

export interface INotification {
  company: string;
  notificationNumber: string;
  detectionDate: Date;
  equipmentGroupL2: string;
  tag: string;
  shortText?: string;
  longText?: string;
  detectionMethod?: string;
  F1?: string;
  F2?: string;
  failureType?: string;
  created?: Date;
  commonError?: string;
}

export interface INotificationDocument extends INotification, Document {}
