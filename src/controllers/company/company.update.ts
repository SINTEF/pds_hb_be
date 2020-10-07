import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { obj_id, organizationNr, name, email, phoneNr, description, facilities } = req.body;

  if (!organizationNr || !name) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  await CompanyModel.findOneAndUpdate(
    { _id: obj_id },
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
    .then(() => {
      res.status(200).send({
        success: true,
        message: 'Successfully updated the database',
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
