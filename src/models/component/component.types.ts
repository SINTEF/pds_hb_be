import { Document, Schema } from 'mongoose';

interface IData {
  lambda: number;
}

export interface IComponent {
  name: string;
  size?: number;
  design?: string;
  revisionDate?: Date;
  remarks?: string;
  description?: string;
  data: IData; // should be array, but which type?
  module: string;
  equipmentGroup: string;
  dataInstanceIds?: Schema.Types.ObjectId;
  created?: Date;
}

export interface IComponentDocument extends IComponent, Document {}
