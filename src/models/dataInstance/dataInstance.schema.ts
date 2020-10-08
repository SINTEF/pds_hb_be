import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DataInstanceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  facility: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  T: {
    type: Number,
    required: true,
  },
  du: {
    type: Number,
    required: true,
  },
  populationSize: {
    type: Number,
  },
  created: { type: Date, default: Date.now },
});
