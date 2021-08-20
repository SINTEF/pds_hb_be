import db from '../../db';
import mongoose from 'mongoose';
import { CommentModel } from '..';

const commentData = {
  company: 'Equisouth',
  notificationNumber: '123456789',
  content: 'This is a test',
};

const commentDataMissingField = {
  company: 'Equisouth',
  //notificationNumber: '123456789',
  content: 'This is a test',
};

describe('Comment Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save inventory instance successfully', async () => {
    const validComment = new CommentModel(commentData);
    const savedComment = await validComment.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedComment._id).toBeDefined();
    expect(savedComment.company).toBe(commentData.company);
    expect(savedComment.notificationNumber).toBe(commentData.notificationNumber);
    expect(savedComment.content).toBe(commentData.content);
    expect(savedComment.created).toBeDefined();
    await CommentModel.findOneAndDelete({ _id: savedComment._id });
  });

  it('create inventory instance without required field fails', () => {
    const commentWithoutRequiredField = new CommentModel(commentDataMissingField);
    commentWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
