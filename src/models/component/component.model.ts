import { model } from 'mongoose';
import { IComponentDocument } from './component.types';
import { ComponentSchema } from './component.schema';

export const ComponentModel = model<IComponentDocument>('component', ComponentSchema);
