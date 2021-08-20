import express from 'express';
import db from '../../db';
import { NotificationGroupModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  const { _id } = req.params;

  NotificationGroupModel.findOneAndDelete({ _id })
    .then((notificationGroup) => {
      if (!notificationGroup) {
        res.status(404).send({
          success: false,
          message: 'notificationGroup does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'notificationGroup successfully deleted',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Something wrong with inputs',
        Error: err,
      });
    });
};

export default del;
