import { model } from 'mongoose';
import { IModuleDocument } from './module.types';
import { ModuleSchema } from './module.schema';

export const UserModel = model<IModuleDocument>('user', ModuleSchema);
