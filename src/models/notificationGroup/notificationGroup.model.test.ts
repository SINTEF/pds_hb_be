import db from '../../db';
import mongoose from 'mongoose';
import { NotificationGroupModel } from '..';

const notificationGroupData = {
  company: 'Equisouth',
  name: 'test',
  description: 'This is a test',
  type: 'common',
  failureMode: 'FTC',
};

const notificationGroupDataMissingField = {
  company: 'Equisouth',
  //name: 'test',
  description: 'This is a test',
  type: 'common',
  failureMode: 'FTC',
};

describe('NotificationGroup Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save inventory instance successfully', async () => {
    const validNotificationGroup = new NotificationGroupModel(notificationGroupData);
    const savedNotificationGroup = await validNotificationGroup.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedNotificationGroup._id).toBeDefined();
    expect(savedNotificationGroup.company).toBe(notificationGroupData.company);
    expect(savedNotificationGroup.name).toBe(notificationGroupData.name);
    expect(savedNotificationGroup.created).toBeDefined();
    await NotificationGroupModel.findOneAndDelete({ _id: savedNotificationGroup._id });
  });

  it('create inventory instance without required field fails', () => {
    const notificationGroupWithoutRequiredField = new NotificationGroupModel(notificationGroupDataMissingField);
    notificationGroupWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
