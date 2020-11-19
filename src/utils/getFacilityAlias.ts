import db from '../db';
import { FacilityAliasModel } from '../models';
import { IFacilityAliasDocument } from '../models/facilityAlias/facilityAlias.types';

export const getFacilityAlias = async (facility: string): Promise<IFacilityAliasDocument | null> => {
  db.connect();

  const facilityAlias = await FacilityAliasModel.findOne({ facility }).then((alias) => alias);

  return facilityAlias;
};
