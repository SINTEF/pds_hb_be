import { model } from 'mongoose';
import { ICompanyAliasDocument } from './companyAlias.types';
import { CompanyAliasSchema } from './companyAlias.shcema';

export const CompanyAliasModel = model<ICompanyAliasDocument>('companyAlias', CompanyAliasSchema);
