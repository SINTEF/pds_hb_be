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
  L3: {
    measuringPrinciples: [
      {
        type: String,
      },
    ],
    designMountingPrinciple: [
      {
        type: String,
      },
    ],
    actuationPrinciple: [
      {
        type: String,
      },
    ],
    mediumProperties: [
      {
        type: String,
      },
    ],
    dimension: [
      {
        type: String,
      },
    ],
    locationEnvironment: [
      {
        type: String,
      },
    ],
    application: [
      {
        type: String,
      },
    ],
    diagnosticsConfiguration: [
      {
        type: String,
      },
    ],
    testMaintenanceMonitoringStrategy: [
      {
        type: String,
      },
    ],
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
  created: { type: Date, default: Date.now },
});
