import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  companyId: {
    // Foreign key to company
    type: String,
    required: true,
  },
  userGroupId: {
    // Foreign key to corresponding user group
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
