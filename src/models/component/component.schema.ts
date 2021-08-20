import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ComponentSchema = new Schema({
  description: {
    type: String,
  },
  equipmentGroupL2: {
    type: String,
    required: true,
  },
  created: { type: Date, default: new Date() },
});
