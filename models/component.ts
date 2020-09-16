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
  },
  { timestamps: true }
);

// Create a model based on the schema we just made
const Component = mongoose.model('Component', componentSchema);

module.exports = Component;
