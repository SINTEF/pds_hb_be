import db from '../db';
import { CompanyAliasModel } from '../models';

export const makeCompanyAlias = async (company: string): Promise<void> => {
  db.connect();

  const previousAlias = (await CompanyAliasModel.find().then((aliasDocs) => {
    const aliases = aliasDocs.map((aliasDoc) => aliasDoc.alias);
    return Math.max(...aliases);
  })) as number;

  if (!previousAlias && previousAlias !== 0) throw 'Previous alias not found';

  // prevousIndex === -Infinity if the alias collection is empty
  const alias = previousAlias === -Infinity ? 1 : previousAlias + 1;
  const newAlias = new CompanyAliasModel({
    company,
    alias,
  });

  newAlias.save().catch(() => {
    throw 'unable to save alias';
  });
};
