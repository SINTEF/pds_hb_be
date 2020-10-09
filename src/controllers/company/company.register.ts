import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const register = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { organizationNr, name, email, phoneNr, description, facilities } = req.body;
  if (!organizationNr || !name || !email) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const newCompany = new CompanyModel({
    organizationNr,
    name,
    email,
    phoneNr,
    description,
    facilities,
  });

  newCompany
    .save()
    .then((company) =>
      res.status(200).send({
        success: true,
        message: 'Company successfully created! Company document:',
        document: company,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating company.',
        duplicateField: err.keyValue,
      })
    );
};

export default register;
