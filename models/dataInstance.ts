import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dataInstanceSchema = new Schema(
  {
    companyId: {
      type: String,
    },
    equipmentGroup: {
      type: String,
    },
    componentId: {
      type: String,
    },
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
  },
  { timestamps: true }
);

// Create a model based on the schema we just made
const DataInstance = mongoose.model('DataInstance', dataInstanceSchema);

module.exports = DataInstance;
