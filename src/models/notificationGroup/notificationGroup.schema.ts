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
  },

  description: {
    type: String,
  },

  created: { type: Date, default: Date.now },
});
