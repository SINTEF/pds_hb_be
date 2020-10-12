import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ComponentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    measuringPrinciples: {
      type: [String],
      default: undefined,
    },
    designMountingPrinciples: {
      type: [String],
      default: undefined,
    },
    actuationPrinciples: {
      type: [String],
      default: undefined,
    },
    mediumProperties: {
      type: [String],
      default: undefined,
    },
    dimensions: {
      type: [String],
      default: undefined,
    },
    locationEnvironments: {
      type: [String],
      default: undefined,
    },
    applications: {
      type: [String],
      default: undefined,
    },
    diagnosticsConfigurations: {
      type: [String],
      default: undefined,
    },
    testMaintenanceMonitoringStrategies: {
      type: [String],
      default: undefined,
    },
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
