import { model } from 'mongoose';
import { IUserGroupDocument } from './user.group.types';
import { UserGroupSchema } from './user.group.schema';

export const UserGrouptModel = model<IUserGroupDocument>('userGroup', UserGroupSchema);