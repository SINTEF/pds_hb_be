import { model } from 'mongoose';
import { IPdsHandbookDocument } from './pdsHandbook.types';
import { PdsHandbookSchema } from './pdsHandbook.schema';

export const PdsHandbookModel = model<IPdsHandbookDocument>('pdsHandbook', PdsHandbookSchema);
