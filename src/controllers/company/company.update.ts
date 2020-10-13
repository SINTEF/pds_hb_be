import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { _id, organizationNr, name, email, phoneNr, description, facilities } = req.body;

  if (!organizationNr || !name) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  CompanyModel.findOneAndUpdate(
    { _id },
    {
      organizationNr: organizationNr,
      name: name,
      email: email,
      phoneNr: phoneNr,
      description: description,
      facilities: facilities,
    },
    { useFindAndModify: false }
  )
    .then((company) => {
      res.status(200).send({
        success: true,
        message: 'Company successfully updated',
        data: company,
      });
    })
    .catch((err) => {
      res.status(409).send({
        success: false,
        message: 'Error: Values not unique',
        duplicateField: err.keyValue,
      });
    });
};

export default update;
