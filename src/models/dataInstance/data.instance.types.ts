import { Document, Schema } from 'mongoose';

interface IPeriod {
  startDate: Date,
  endDate: Date,
}

export interface IDataInstance {
  facility: string;
  period: IPeriod;
  T: number;
  du?: number;
  populationSize: number;
  companyId: Schema.Types.ObjectId;
  componentId: Schema.Types.ObjectId;
  created: Date;
}

export interface IDataInstanceDocument extends IDataInstance, Document {}
