import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models/';

const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  NotificationModel.find(query)
    .then((notifications) => {
      res.status(200).send({
        success: true,
        data: notifications,
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

export default getAll;
