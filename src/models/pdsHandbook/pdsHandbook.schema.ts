import { Schema } from 'mongoose';

export const PdsHandbookSchema = new Schema({
  chapters: [
    {
      id: {
        type: Number,
        required: true,
        unique: true,
      },
      text: {
        type: String,
      },
      editedBy: {
        type: String,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
