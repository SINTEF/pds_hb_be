import express from 'express';
import db from '../../db';
import { PeriodModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const period = await PeriodModel.findOne({ _id }).then((period) => period);
  const companyName = period?.company;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName });
  if (!isAuthorized) return;

  PeriodModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((period) => {
      res.status(200).send({
        success: true,
        message: 'Data instance successfully updated',
        data: period,
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

//
export default update;
