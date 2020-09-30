import { Document, Schema } from 'mongoose';

export interface IUser {
  username?: string;
  passwordHash?: string;
  email?: string;
  phoneNo: string;
  companyId: Schema.Types.ObjectId;
  userGroupId?: string;
}

export interface IUserDocument extends IUser, Document {}
