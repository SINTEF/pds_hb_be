import { model } from 'mongoose';
import { IDataInstanceDocument } from './dataInstance.types';
import { DataInstanceSchema } from './dataInstance.schema';

export const DataInstanceModel = model<IDataInstanceDocument>('dataInstance', DataInstanceSchema);
