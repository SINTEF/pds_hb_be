import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { organizationNr, name, email, phoneNr, description, facilities, maxUsers } = req.body;
  if (!organizationNr || !name || !email) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  //const isAuthorized = checkAuthorization(req, res, {checkAdminOrCompany: true, companyName: name});
  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  const newCompany = new CompanyModel({
    organizationNr,
    name,
    email,
    phoneNr,
    description,
    facilities,
    maxUsers,
  });

  newCompany
    .save()
    .then((company) =>
      res.status(200).send({
        success: true,
        message: 'Company successfully created',
        data: company,
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
