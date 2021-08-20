import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CommentSchema = new Schema({
  company: {
    type: String,
    required: true,
  },

  notificationNumber: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },

  created: { type: Date, default: Date.now },
});
