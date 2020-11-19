import { Document } from 'mongoose';

export interface IFacilityAlias {
  facility: string;
  alias: string;
  index: number;
}

export interface IFacilityAliasDocument extends IFacilityAlias, Document {}
