import { Document, Schema } from 'mongoose';

export interface IDataInstance {
    facility: string;
    period: Date;
    T: number;
    du?: number;
    populationSize: number;
    companyId: Schema.Types.ObjectId;
    componentId: Schema.Types.ObjectId;
    created: Date;
  }

  export interface IDataInstanceDocument extends IDataInstance, Document {}