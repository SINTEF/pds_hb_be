import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  userGroupId: {
    // Foreign key to corresponding user group
    type: Schema.Types.ObjectId,
    ref: 'UserGroup',
    required: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
