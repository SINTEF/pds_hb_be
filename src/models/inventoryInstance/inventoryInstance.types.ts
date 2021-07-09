import { Document } from 'mongoose';

type TStatus = 'published' | 'approved' | 'not approved' | 'not reviewed';

export interface IInventoryInstance {
  company: string;
  facility: string;
  tag: string;
  tagDescription?: string;
  equipmentGroupL2: string;
  vendor?: string;
  equipmentModel?: string;
  startDate?: Date;
  created?: Date;
  L3: {
    type?: string;
    medium?: string;
    size?: number;
  };
}

export interface IInventoryInstanceDocument extends IInventoryInstance, Document {}
