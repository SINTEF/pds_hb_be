import db from '../../db';
import mongoose from 'mongoose';
import { DataInstanceModel } from '..';

const dataInstanceData = {
  company: 'Equinor',
  facility: 'Johan Castberg',
  component: 'Flame-detector',
  T: '10.9',
  du: '3',
  L3: {
    measuringPrinciple: 'multi-spectrum IR',
    locationEnvironment: 'Area A4',
  },
};

const dataInstanceDataMissingField = {
  company: 'Equinor',
  facility: 'Johan Castberg',
  component: 'Flame-detector',
  T: '10.9', // du i required
  L3: {
    measuringPrinciple: 'multi-spectrum IR',
    locationEnvironment: 'Area A4',
  },
};

describe('DataInstance Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save data instance successfully', async () => {
    const validDataInstance = new DataInstanceModel(dataInstanceData);
    const savedDataInstance = await validDataInstance.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedDataInstance._id).toBeDefined();
    expect(savedDataInstance.company).toBe(dataInstanceData.company);
    expect(savedDataInstance.facility).toBe(dataInstanceData.facility);
    expect(savedDataInstance.created).toBeDefined();
    await DataInstanceModel.findOneAndDelete({ _id: savedDataInstance._id });
  });

  it('create data instance without required field fails', () => {
    const dataInstanceWithoutRequiredField = new DataInstanceModel(dataInstanceDataMissingField);
    dataInstanceWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
