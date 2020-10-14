import { Document } from 'mongoose';

export interface IUser {
  username: string;
  passwordHash: string;
  email: string;
  phoneNr?: string;
  companyName?: string;
  userGroupType: string;
}

export interface IUserDocument extends IUser, Document {}
