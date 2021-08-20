import { model } from 'mongoose';
import { IPeriodDocument } from './period.types';
import { PeriodSchema } from './period.schema';

export const PeriodModel = model<IPeriodDocument>('period', PeriodSchema);
