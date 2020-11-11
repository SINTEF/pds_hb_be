import db from '../../db';
import mongoose from 'mongoose';
import { ComponentModel } from '..';

const componentData = {
  name: 'Flame-detector',
  L3: {
    measuringPrinciple: ['multi-spectrum IR', 'single-frequency IR', 'single-frequency UV', 'multi-spectrum UV'],
    locationEnvironment: ['A1', 'A2', 'A3'],
  },
  data: [0],
  module: 'Input Devices',
  equipmentGroup: 'Fire detector',
};

const componentDataCopyCat = {
  name: 'Flame-detector',
  L3: {
    measuringPrinciple: ['multi-spectrum IR', 'single-frequency IR', 'single-frequency UV', 'multi-spectrum UV'],
    locationEnvironment: ['A1', 'A2', 'A3'],
  },
  data: [0],
  module: 'Input Devices',
  equipmentGroup: 'Fire detector',
};

const componentDataMissingField = {
  name: 'Flame-detector',
  L3: {
    measuringPrinciple: ['multi-spectrum IR', 'single-frequency IR', 'single-frequency UV', 'multi-spectrum UV'],
    locationEnvironment: ['A1', 'A2', 'A3'],
  },
  data: [0],
  module: 'Input Devices', // equipment group is required
};

describe('Component Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save component successfully', async () => {
    const validComponent = new ComponentModel(componentData);
    const savedComponent = await validComponent.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedComponent._id).toBeDefined();
    expect(savedComponent.name).toBe(componentData.name);
    expect(savedComponent.module).toBe(componentData.module);
    expect(savedComponent.equipmentGroup).toBe(componentData.equipmentGroup);
    expect(savedComponent.created).toBeDefined();
    await ComponentModel.findOneAndDelete({ name: componentData.name });
  });

  it('creating two components with same required and unique key fails', async () => {
    const validComponent = new ComponentModel(componentData);
    await validComponent.save();
    const copyCatCompany = new ComponentModel(componentDataCopyCat);
    try {
      await copyCatCompany.save();
    } catch (error) {
      expect(error.name).toBe('MongoError');
      expect(error.code).toBe(11000); // code for duplicate key error
    }
    await ComponentModel.findOneAndDelete({ name: componentData.name });
  });

  it('create component without required field fails', () => {
    const companyWithoutRequiredField = new ComponentModel(componentDataMissingField);
    companyWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
