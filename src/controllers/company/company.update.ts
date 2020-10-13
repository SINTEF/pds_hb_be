import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const name = req.params.name;
  console.log(name);
  const { organizationNr, email, phoneNr, description, facilities, maxUsers } = req.body;

  CompanyModel.findOneAndUpdate(
    { name: name },
    {
      organizationNr: organizationNr,
      email: email,
      phoneNr: phoneNr,
      description: description,
      facilities: facilities,
      maxUsers: maxUsers,
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
