import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const componentSchema = new Schema(
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
const Component = mongoose.model('Sensor', componentSchema);

module.exports = Component;
