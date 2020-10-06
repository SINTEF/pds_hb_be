import { Document } from 'mongoose';

export interface IDataInstance {
  facility?: string;
  startPeriod?: Date;
  endPeriod?: Date;
  T: number;
  du: number;
  populationSize?: number;
  created?: Date;
}

export interface IDataInstanceDocument extends IDataInstance, Document {}
