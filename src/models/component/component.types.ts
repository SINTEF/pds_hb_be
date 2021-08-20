import { Document } from 'mongoose';
export interface IComponent {
  description: string;
  equipmentGroupL2: string;
  created?: Date;
}

export interface IComponentDocument extends IComponent, Document {}
