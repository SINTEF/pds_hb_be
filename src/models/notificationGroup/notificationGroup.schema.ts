import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const NotificationGroupSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  description: {
    type: String,
  },

  type: {
    type: String,
  },

  failureMode: {
    type: String,
  },

  created: { type: Date, default: Date.now },
});
