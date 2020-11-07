import db from '../db';
import mongoose from 'mongoose';
import { CompanyModel } from '../models';

const companyData = {
  organizationNr: '1',
  name: 'AlexCompany',
  email: 'alex@company.com',
  maxUsers: 10,
};

const companyDataCopyCat = {
  organizationNr: '2',
  name: 'AlexCompany',
  email: 'alex2@company.com',
  maxUsers: 10,
};

const companyDataMissingField = {
  organizationNr: '1',
  name: 'AlexCompany', // email is a required field
  maxUsers: 10,
};

describe('Company Tests', () => {
  beforeAll(() => {
    db.connectTest();
  });

  it('create & save company successfully', async () => {
    const validCompany = new CompanyModel(companyData);
    const savedCompany = await validCompany.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedCompany._id).toBeDefined();
    expect(savedCompany.organizationNr).toBe(companyData.organizationNr);
    expect(savedCompany.name).toBe(companyData.name);
    expect(savedCompany.email).toBe(companyData.email);
    expect(savedCompany.created).toBeDefined();
    await CompanyModel.findOneAndDelete({ name: companyData.name });
  });

  it('creating two companies with same required and unique key fails', async () => {
    const validCompany = new CompanyModel(companyData);
    await validCompany.save();
    const copyCatCompany = new CompanyModel(companyDataCopyCat);
    try {
      await copyCatCompany.save();
    } catch (error) {
      expect(error.name).toBe('MongoError');
      expect(error.code).toBe(11000); // code for duplicate key error
    }
    await CompanyModel.findOneAndDelete({ name: companyData.name });
  });

  it('create company without required field fails', () => {
    const companyWithoutRequiredField = new CompanyModel(companyDataMissingField);
    companyWithoutRequiredField
      .save()
      .then(() => fail('company schema should not be successfully saved, as it is missing required field(s)'))
      .catch((error) => expect(error).toBeInstanceOf(mongoose.Error.ValidationError));
  });

  afterAll(() => {
    db.disconnect();
  });
});
