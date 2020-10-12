import { Schema } from 'mongoose';

export const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  equipmentGroups: {
    type: Array,
  },
});
