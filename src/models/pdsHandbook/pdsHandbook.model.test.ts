import db from '../../db';
import mongoose from 'mongoose';
import { PdsHandbookModel } from '..';

const chapterData = {
  chapterId: 'Chapter 1',
  text: 'This is chapter 1',
};

const chapterDataCopyCat = {
  chapterId: 'Chapter 1',
  text: 'This is not actually chapter 1',
};

const chapterDataMissingField = {
  text: 'This chapter is missing a chapterId',
};

describe('Module Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save chapter successfully', async () => {
    const validChapter = new PdsHandbookModel(chapterData);
    const savedChapter = await validChapter.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedChapter._id).toBeDefined();
    expect(savedChapter.chapterId).toBe(chapterData.chapterId);
    expect(savedChapter.text).toBe(chapterData.text);
    expect(savedChapter.lastUpdated).toBeDefined();
    await PdsHandbookModel.findOneAndDelete({ chapterId: chapterData.chapterId });
  });

  it('creating two chapters with same required and unique key fails', async () => {
    const validChapter = new PdsHandbookModel(chapterData);
    await validChapter.save();
    const copyCatChapter = new PdsHandbookModel(chapterDataCopyCat);
    try {
      await copyCatChapter.save();
    } catch (error) {
      expect(error.name).toBe('MongoError');
      expect(error.code).toBe(11000); // code for duplicate key error
    }
    await PdsHandbookModel.findOneAndDelete({ chapterId: chapterData.chapterId });
  });

  it('create chapter without required field fails', () => {
    const chapterWithoutRequiredField = new PdsHandbookModel(chapterDataMissingField);
    chapterWithoutRequiredField
      .save()
      .then(() => fail('PDS Handbook schema should not be successfully saved, as a chapter is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
