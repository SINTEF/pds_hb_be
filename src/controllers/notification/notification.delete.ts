import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  const { _id } = req.params;

  NotificationModel.findOneAndDelete({ _id })
    .then((notification) => {
      if (!notification) {
        res.status(404).send({
          success: false,
          message: 'notification does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'notification successfully deleted',
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
