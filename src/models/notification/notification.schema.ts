import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const NotificationSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  notificationNumber: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  detectionDate: {
    type: Date,
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
  shortText: {
    type: String,
  },
  longText: {
    type: String,
  },
  workOrder: {
    type: String,
  },
  activityText: {
    type: String,
  },
  detectionMethod: {
    type: String,
  },
  F1: {
    type: String,
  },
  F2: {
    type: String,
  },
  failureType: {
    type: String,
  },

  commonFailure: {
    type: String,
  },

  repeatingFailure: {
    type: String,
  },

  qualityStatus: {
    type: Boolean,
  },

  operatorComment: {
    type: Array,
  },

  status: {
    type: String,
  },

  created: { type: Date, default: Date.now },
});
