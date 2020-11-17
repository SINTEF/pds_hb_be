import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const FacilityAliasliasSchema = new Schema({
  facility: {
    type: String,
    required: true,
    unique: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  index: {
    type: Number,
    required: true,
    unique: true,
  },
});
