import db from '../../db';
import { ModuleModel } from '..';

const moduleData = {
  name: 'Input devices',
  equipmentGroups: ['Fire detector', 'Smoke detector', 'Process transmitters', 'Process switches', 'Auxiliary switches and transmitters'],
};

const moduleDataCopyCat = {
  name: 'Input devices',
  equipmentGroups: ['Fire detector', 'Smoke detector', 'Process transmitters', 'Process switches', 'Auxiliary switches and transmitters'],
};

describe('Module Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save module successfully', async () => {
    const validModule = new ModuleModel(moduleData);
    const savedModule = await validModule.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedModule._id).toBeDefined();
    expect(savedModule.name).toBe(moduleData.name);
    await ModuleModel.findOneAndDelete({ name: savedModule.name });
  });

  it('creating two modules with same required and unique key fails', async () => {
    const validModule = new ModuleModel(moduleData);
    await validModule.save();
    const copyCatModule = new ModuleModel(moduleDataCopyCat);
    try {
      await copyCatModule.save();
    } catch (error) {
      expect(error.name).toBe('MongoError');
      expect(error.code).toBe(11000); // code for duplicate key error
    }
    await ModuleModel.findOneAndDelete({ name: moduleData.name });
  });

  afterAll(() => {
    db.disconnect();
  });
});
