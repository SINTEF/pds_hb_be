import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const DataInstanceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },
  facility: {
    type: String,
    required: true,
  },
  component: {
    type: String,
    required: true,
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
  failureRates: {
    type: Number,
  },
  comment: {
    type: String,
  },
  L3: {
    measuringPrinciple: {
      type: String,
    },
    designMountingPrinciple: {
      type: String,
    },
    actuationPrinciple: {
      type: String,
    },
    mediumProperty: {
      type: String,
    },
    dimension: {
      type: String,
    },
    locationEnvironment: {
      type: String,
    },
    application: {
      type: String,
    },
    diagnosticsConfiguration: {
      type: String,
    },
    testMaintenanceMonitoringStrategy: {
      type: String,
    },
  },
  created: { type: Date, default: Date.now },
});
