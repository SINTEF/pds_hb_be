import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DataInstanceSchema = new Schema(
  {
    facility: {
      type: String,
    },
    period: {
      startDate: { type: Date },
      endDate: { type: Date },
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
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
      unique: true,
    },
    componentId: {
      type: Schema.Types.ObjectId,
      ref: 'Component',
      required: true,
      unique: true,
    },
    created: { type: Date, default: Date.now},
  },
);


