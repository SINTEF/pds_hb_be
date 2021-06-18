import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const InventoryInstanceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  facility: {
    type: String,
    required: true,
  },

  equipmentGroupL2: {
    type: String,
    required: true,
  },

  tag: {
    type: String,
    required: true,
  },

  vendor: {
    type: String,
  },

  equipmentModel: {
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
