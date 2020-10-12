import { Document } from 'mongoose';

export interface IModule {
  name: string;
  equipmentGroups: Array<string>;
}

export interface IModuleDocument extends IModule, Document {}
