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
  numberOfTests: {
    type: Number,
  },

  created: { type: Date, default: Date.now },
});
