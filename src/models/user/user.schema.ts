import { Schema } from 'mongoose';

export const UserSchema = new Schema({
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
    unique: true,
  },
  phoneNr: {
    type: String,
    unique: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  userGroupId: {
    //type: Schema.Types.ObjectId,
    type: String,
    ref: 'UserGroup',
    required: true,
  },
});
