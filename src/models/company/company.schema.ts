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
  },
  email: {
    type: String,
  },
  phoneNr: {
    type: String,
  },
  description: {
    type: String,
  },
  facility: [{ type: String }],
  componentIds: [{ type: Schema.Types.ObjectId, ref: 'Component' }],
  employeeIds: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  dataInstanceIds: [{ type: Schema.Types.ObjectId, ref: 'DataInstance' }],
  created: { type: Date, default: Date.now },
});


