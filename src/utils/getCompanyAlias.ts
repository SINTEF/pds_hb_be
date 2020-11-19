import db from '../db';
import { CompanyAliasModel } from '../models';
import { ICompanyAliasDocument } from '../models/companyAlias/companyAlias.types';

export const getCompanyAlias = async (company: string): Promise<ICompanyAliasDocument | null> => {
  db.connect();

  const companyAlias = await CompanyAliasModel.findOne({ company }).then((alias) => alias);

  return companyAlias;
};
