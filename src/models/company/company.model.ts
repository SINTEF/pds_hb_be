import { model } from 'mongoose';
import { ICompanyDocument } from './company.types';
import { CompanySchema } from './company.schema';

export const CompanytModel = model<ICompanyDocument>('company', CompanySchema);