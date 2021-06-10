import { Document } from 'mongoose';

type TStatus = 'published' | 'approved' | 'not approved' | 'not reviewed';

export interface INotification {
  company: string;
  facility: string;
  component: string;
  startDate?: Date;
  endDate?: Date;
  T: number;
  du: number;
  populationSize?: number;
  failureRates?: number;
  comment?: string;
  sintefComment?: string;
  status?: TStatus;
  L3: {
    measuringPrinciple?: string;
    designMountingPrinciple?: string;
    actuationPrinciple?: string;
    mediumProperty?: string;
    dimension?: string;
    locationEnvironment?: string;
    application?: string;
    diagnosticsConfiguration?: string;
    testMaintenanceMonitoringStrategy?: string;
  };
  created?: Date;
}

export interface INotificationDocument extends INotification, Document {}
