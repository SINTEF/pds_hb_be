import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CompanySchema = new Schema({
  organizationNr: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNr: {
    type: String,
  },
  description: {
    type: String,
  },
  facilities: [{ type: String }],
  created: { type: Date, default: Date.now },
});
