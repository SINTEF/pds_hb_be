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
    measuringPrinciple?: string;
    designMountingPrinciple?: string;
    actuationPrinciple?: string;
    service?: string;
    medium?: string;
    dimension?: string;
    locationEnvironment?: string;
    application?: string;
    diagnosticsInternal?: string;
    diagnosticsExternal?: string;
    configuration?: string;
    type?: string;
  };
}

export interface IInventoryInstanceDocument extends IInventoryInstance, Document {}
