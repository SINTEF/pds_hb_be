import { Document } from 'mongoose';

type TStatus = 'published' | 'unpublished';

export interface IDataInstance {
  company: string;
  facility: string;
  component: string;
  startDate?: Date;
  endDate?: Date;
  T: number;
  du: number;
  populationSize?: number;
  failureRate?: number;
  comment?: string;
  //sintefComment?: string;
  status?: TStatus;
  /*L3: {
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
  */
  created?: Date;
}

export interface IDataInstanceDocument extends IDataInstance, Document {}
