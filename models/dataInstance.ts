import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dataInstanceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema we just made
const DataInstance = mongoose.model('dataInstance', dataInstanceSchema);

module.exports = DataInstance;
