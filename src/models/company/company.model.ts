import { model } from 'mongoose';
import { ICompanyDocument } from './company.types';
import { CompanySchema } from './company.schema';

export const CompanyModel = model<ICompanyDocument>('company', CompanySchema);
