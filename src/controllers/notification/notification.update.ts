import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const notification = await NotificationModel.findOne({ _id }).then((notification) => notification);
  const companyName = notification?.company;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName });
  if (!isAuthorized) return;

  NotificationModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((notification) => {
      res.status(200).send({
        success: true,
        message: 'Data instance successfully updated',
        data: notification,
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
