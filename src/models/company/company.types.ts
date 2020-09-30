import { Document, Schema } from 'mongoose';

export interface ICompany {
  organizationNr: string;
  name: string;
  email?: string;
  phoneNr?: string;
  description?: string;
  facilities?: Array<string>;
  componentIds?: Array<Schema.Types.ObjectId>;
  employeeIds?: Array<Schema.Types.ObjectId>;
  dataInstanceIds?: Array<Schema.Types.ObjectId>;
  created?: Date;
}

export interface ICompanyDocument extends ICompany, Document {}
