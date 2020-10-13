import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  CompanyModel.findOneAndUpdate({ name: req.params.name }, { $set: req.body }, { useFindAndModify: false, new: true })
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
