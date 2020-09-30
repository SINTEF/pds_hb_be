import { model } from 'mongoose';
import { IDataInstanceDocument } from './data.instance.types';
import { DataInstanceSchema } from './data.instance.schema';

export const DataInstanceModel = model<IDataInstanceDocument>('dataInstance', DataInstanceSchema);
