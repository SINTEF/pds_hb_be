import { model } from 'mongoose';
import { IInventoryInstanceDocument } from './inventoryInstance.types';
import { InventoryInstanceSchema } from './inventoryInstance.schema';

export const InventoryInstanceModel = model<IInventoryInstanceDocument>('inventoryInstance', InventoryInstanceSchema);
