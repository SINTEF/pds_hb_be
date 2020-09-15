import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const componentSchema = new Schema(
  {
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
      // Object holding component data (lambda, failure rate, etc)
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a model based on the schema we just made
const Component = mongoose.model('Component', componentSchema);

module.exports = Component;
