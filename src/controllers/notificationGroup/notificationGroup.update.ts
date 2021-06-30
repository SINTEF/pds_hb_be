import express from 'express';
import db from '../../db';
import { NotificationGroupModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const notificationGroup = await NotificationGroupModel.findOne({ _id }).then((notificationGroup) => notificationGroup);
  const companyName = notificationGroup?.company;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName });
  if (!isAuthorized) return;

  NotificationGroupModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((notificationGroup) => {
      res.status(200).send({
        success: true,
        message: 'NotificationGroup successfully updated',
        data: notificationGroup,
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
