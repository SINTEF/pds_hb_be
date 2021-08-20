import { Document } from 'mongoose';

type TStatus = 'published' | 'unpublished' | 'new';

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
  status?: TStatus;
  created?: Date;
}

export interface IDataInstanceDocument extends IDataInstance, Document {}
