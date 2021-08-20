import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';

const getOne = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { _id } = req.params;

  if (!_id) {
    res.status(400).send({
      success: false,
      message: 'Something wrong with parameters',
    });
    return;
  }

  NotificationModel.findOne({ _id })
    .then((notification) => {
      res.status(200).send({
        success: true,
        data: notification,
      });
    })
    .catch((err) =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
        error: err,
      })
    );
};

export default getOne;
