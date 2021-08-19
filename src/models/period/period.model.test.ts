import db from '../../db';
import mongoose from 'mongoose';
import { PeriodModel } from '..';

const periodData = {
  tag: '123-abc',
  startDate: new Date('2021-10-10'),
  endDate: new Date('2022-10-10'),
  company: 'Equisouth',
  numberOfTests: 2,
};

const periodDataMissingField = {
  //tag: '123-abc',
  startDate: new Date('2021-10-10'),
  endDate: new Date('2022-10-10'),
  company: 'Equisouth',
  numberOfTests: 2,
};

describe('Period Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save inventory instance successfully', async () => {
    const validPeriod = new PeriodModel(periodData);
    const savedPeriod = await validPeriod.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedPeriod._id).toBeDefined();
    expect(savedPeriod.company).toBe(periodData.company);
    expect(savedPeriod.tag).toBe(periodData.tag);
    expect(savedPeriod.startDate).toBe(periodData.startDate);
    expect(savedPeriod.endDate).toBe(periodData.endDate);
    expect(savedPeriod.created).toBeDefined();
    await PeriodModel.findOneAndDelete({ _id: savedPeriod._id });
  });

  it('create inventory instance without required field fails', () => {
    const periodWithoutRequiredField = new PeriodModel(periodDataMissingField);
    periodWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
