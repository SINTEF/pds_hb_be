import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DataInstanceSchema = new Schema({
  facility: {
    type: String,
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
