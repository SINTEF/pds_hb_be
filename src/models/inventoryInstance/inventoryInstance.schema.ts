import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const InventoryInstanceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
  },

  facility: {
    type: String,
    required: true,
  },

  equipmentGroupL2: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    required: true,
  },

  tagDescription: {
    type: String,
  },

  vendor: {
    type: String,
  },

  equipmentModel: {
    type: String,
  },

  L3: {
    type: {
      type: String,
    },
    medium: {
      type: String,
    },
    size: {
      type: Number,
    },
  },

  created: { type: Date, default: Date.now },
});
