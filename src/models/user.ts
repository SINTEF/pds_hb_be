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
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  userGroupId: {
    type: Schema.Types.ObjectId,
    ref: 'UserGroup',
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
