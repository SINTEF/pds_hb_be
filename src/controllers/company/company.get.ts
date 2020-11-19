import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const getOne = (req: express.Request, res: express.Response): void => {
  db.connect();

  const name = req.params.name;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: name });
  if (!isAuthorized) return;

  CompanyModel.findOne({ name })
    .then((company) => {
      res.status(200).send({
        success: true,
        data: company,
      });
    })
    .catch((err) =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs',
        error: err,
      })
    );
};

export default getOne;
