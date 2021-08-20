import db from '../../db';
import mongoose from 'mongoose';
import { InventoryInstanceModel } from '..';

const inventoryInstanceData = {
  company: 'Equisouth',
  facility: 'Troll',
  tag: '123-abc',
  equipmentGroupL2: 'Flame-detector',
  startDate: new Date('2021-10-10'),
  L3: {
    measuringPrinciple: 'multi-spectrum IR',
    locationEnvironment: 'Area A4',
  },
};

const inventoryInstanceDataMissingField = {
  company: 'Equisouth',
  facility: 'Troll',
  tag: '123-abc',
  //equipmentGroupL2: 'Flame-detector',
  startDate: new Date('2021-10-10'),
  L3: {
    measuringPrinciple: 'multi-spectrum IR',
    locationEnvironment: 'Area A4',
  },
};

describe('InventoryInstance Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save inventory instance successfully', async () => {
    const validInventoryInstance = new InventoryInstanceModel(inventoryInstanceData);
    const savedInventoryInstance = await validInventoryInstance.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedInventoryInstance._id).toBeDefined();
    expect(savedInventoryInstance.company).toBe(inventoryInstanceData.company);
    expect(savedInventoryInstance.facility).toBe(inventoryInstanceData.facility);
    expect(savedInventoryInstance.created).toBeDefined();
    await InventoryInstanceModel.findOneAndDelete({ _id: savedInventoryInstance._id });
  });

  it('create inventory instance without required field fails', () => {
    const inventoryInstanceWithoutRequiredField = new InventoryInstanceModel(inventoryInstanceDataMissingField);
    inventoryInstanceWithoutRequiredField
      .save()
      .then(() => fail('component schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
