import db from '../../db';
import mongoose from 'mongoose';
import { UserModel } from '..';

const userData = {
  username: 'operatorUser',
  passwordHash: '**********',
  email: 'operator@user.com',
  userGroupType: 'operator',
};

const userDataCopyCat = {
  username: 'operatorUser',
  passwordHash: '**********',
  email: 'operator@user.com',
  userGroupType: 'operator',
};

const userDataMissingField = {
  username: 'operatorUser',
  passwordHash: '**********', // email is required
  userGroupType: 'operator',
};

describe('User Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.userGroupType).toBe(userData.userGroupType);
    await UserModel.findOneAndDelete({ username: userData.username });
  });

  it('creating two users with same required and unique key fails', async () => {
    const validUser = new UserModel(userData);
    await validUser.save();
    const copyCatUser = new UserModel(userDataCopyCat);
    try {
      await copyCatUser.save();
    } catch (error) {
      expect(error.name).toBe('MongoError');
      expect(error.code).toBe(11000); // code for duplicate key error
    }
    await UserModel.findOneAndDelete({ username: userData.username });
  });

  it('create user without required field fails', () => {
    const chapterWithoutRequiredField = new UserModel(userDataMissingField);
    chapterWithoutRequiredField
      .save()
      .then(() => fail('PDS Handbook schema should not be successfully saved, as a user is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
