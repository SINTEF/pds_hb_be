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
  definitionOfDU: {
    type: String,
  },
  L3: {
    measuringPrinciple: {
      type: [String],
      default: undefined,
    },
    designMountingPrinciple: {
      type: [String],
      default: undefined,
    },
    actuationPrinciple: {
      type: [String],
      default: undefined,
    },
    mediumProperty: {
      type: [String],
      default: undefined,
    },
    dimension: {
      type: [String],
      default: undefined,
    },
    locationEnvironment: {
      type: [String],
      default: undefined,
    },
    application: {
      type: [String],
      default: undefined,
    },
    diagnosticsConfiguration: {
      type: [String],
      default: undefined,
    },
    testMaintenanceMonitoringStrategy: {
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
  },
  equipmentGroup: {
    type: String,
    required: true,
  },
  created: { type: Date, default: new Date() },
});
