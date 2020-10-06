import { Document } from 'mongoose';

export interface ICompany {
  organizationNr: string;
  name: string;
  email?: string;
  phoneNr?: string;
  description?: string;
  facilities?: Array<string>;
  created?: Date;
}

export interface ICompanyDocument extends ICompany, Document {}
