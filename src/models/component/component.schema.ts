import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ComponentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
  design: {
    type: String,
  },
  revisionDate: {
    type: Date,
  },
  remarks: {
    type: String,
  },
  description: {
    type: String,
  },
  data: {
    type: Array,
    required: true,
  },
  module: {
    type: String,
    required: true,
    unique: true,
  },
  equipmentGroup: {
    type: String,
    required: true,
    unique: true,
  },
  dataInstanceIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'DataInstance',
    },
  ],
  created: { type: Date, default: Date.now },
});
