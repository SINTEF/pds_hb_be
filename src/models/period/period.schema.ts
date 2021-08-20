import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const PeriodSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },

  numberOfTests: {
    type: Number,
  },

  created: { type: Date, default: Date.now },
});
