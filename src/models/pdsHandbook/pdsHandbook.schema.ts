import { Schema } from 'mongoose';

export const PdsHandbookSchema = new Schema({
  chapterId: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
  },
  // Last edited by
  editedBy: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
});
