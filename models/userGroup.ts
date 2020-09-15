import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userGroupSchema = new Schema({
  type: {
    type: String,
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

const UserGroup = mongoose.model('UserGroup', userGroupSchema);
module.exports = UserGroup;
