import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CompanyAliasSchema = new Schema({
  company: {
    type: String,
    required: true,
    unique: true,
  },
  alias: {
    type: Number,
    required: true,
    unique: true,
  },
});
