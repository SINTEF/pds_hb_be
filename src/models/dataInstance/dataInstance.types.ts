import { Document } from 'mongoose';

export interface IDataInstance {
  company: string;
  facility: string;
  component: string;
  startPeriod?: Date;
  endPeriod?: Date;
  T: number;
  du: number;
  populationSize?: number;
  created?: Date;
}

export interface IDataInstanceDocument extends IDataInstance, Document {}
