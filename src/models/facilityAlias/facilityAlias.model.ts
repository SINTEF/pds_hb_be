import { model } from 'mongoose';
import { IFacilityAliasDocument } from './facilityAlias.types';
import { FacilityAliasliasSchema } from './facilityAlias.schema';

export const FacilityAliasModel = model<IFacilityAliasDocument>('facilityAlias', FacilityAliasliasSchema);
