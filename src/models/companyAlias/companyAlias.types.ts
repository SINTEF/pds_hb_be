import { Document } from 'mongoose';

export interface ICompanyAlias {
  company: string;
  alias: number;
}

export interface ICompanyAliasDocument extends ICompanyAlias, Document {}
