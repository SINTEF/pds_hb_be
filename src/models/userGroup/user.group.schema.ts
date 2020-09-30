import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const UserGroupSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  hasAccessToVendor: {
    type: Boolean,
    required: true,
  },
  hasAccessToOperator: {
    type: Boolean,
    required: true,
  },
  hasAccessToAdmin: {
    type: Boolean,
    required: true,
  },
});


