import db from '../db';
import { CompanyModel } from '../models';

const companyData = {
  organizationNr: '1',
  name: 'AlexCompany',
  email: 'alex@company.com',
  phoneNr: '12345678',
  description: 'worlds leading oil and energy company',
  facilities: ['Oil rig 1', 'Oil rig 2'],
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
  });

  afterAll(() => {
    const database = db.getDatabase();
    database.dropCollection('companies');
  });
});
