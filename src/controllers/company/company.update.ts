import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const companyName = req.params.name;
  console.log(companyName);
  const isAuthorized = checkAuthorization(req, res, { checkAdminOrCompany: true, companyName });
  if (!isAuthorized) return;

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
