import { Document } from 'mongoose';

export interface IUserGroup {
  type?: string;
  hasAccessToVendor?: boolean;
  hasAccessToOperator?: boolean;
  hasAccessToAdmin?: boolean;
}

export interface IUserGroupDocument extends IUserGroup, Document {}
