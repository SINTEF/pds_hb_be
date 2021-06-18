import db from '../../db';
import mongoose from 'mongoose';
import { NotificationModel } from '..';

const notificationData = {
  company: 'Equisouth',
  notificationNumber: '1',
  detectionDate: new Date('2020-10-10'),
  equipmentGroupL2: 'Point HC gas detectors – IR/optical',
  tag: '123-ABC',
};

const notificationDataMissingField = {
  company: 'Equinor',
  notificationNumber: '1',
  detectionDate: new Date('2020-10-10'),
  //equipmentGroupL2: 'Point HC gas detectors – IR/optical',
  tag: '123-ABC',
};

describe('Notification Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save notification successfully', async () => {
    const validNotification = new NotificationModel(notificationData);
    const savedNotification = await validNotification.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedNotification._id).toBeDefined();
    expect(savedNotification.company).toBe(notificationData.company);
    expect(savedNotification.notificationNumber).toBe(notificationData.notificationNumber);
    expect(savedNotification.created).toBeDefined();
    await NotificationModel.findOneAndDelete({ _id: savedNotification._id });
  });

  it('create notification without required field fails', () => {
    const notificationWithoutRequiredField = new NotificationModel(notificationDataMissingField);
    notificationWithoutRequiredField
      .save()
      .then(() => fail('schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
