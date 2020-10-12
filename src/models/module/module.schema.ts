import { Schema } from 'mongoose';

export const ModuleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  equipmentGroups: {
    type: Array,
    required: true,
  },
});
