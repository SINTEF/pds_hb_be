import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const dataInstance = await DataInstanceModel.findOne({ _id }).then((dataInstance) => dataInstance);
  const companyName = dataInstance?.company;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName });
  if (!isAuthorized) return;

  DataInstanceModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((dataInstance) => {
      res.status(200).send({
        success: true,
        message: 'Data instance successfully updated',
        data: dataInstance,
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
