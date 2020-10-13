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
  companyName: {
    type: String,
  },
  userGroupType: {
    // Redo later
    type: String,
  },
});
