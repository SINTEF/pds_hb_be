import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const InventoryInstanceSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
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

  tagDescription: {
    type: String,
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

    service: {
      type: String,
    },

    medium: {
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

    diagnosticsInternal: {
      type: String,
    },

    diagnosticsExternal: {
      type: String,
    },

    configuration: {
      type: String,
    },

    type: {
      type: String,
    },
  },

  created: { type: Date, default: Date.now },
});
