import express from 'express';
import db from '../../db';
import { NotificationGroupModel } from '../../models/';

const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  NotificationGroupModel.find(query)
    .then((notificationGroups) => {
      res.status(200).send({
        success: true,
        data: notificationGroups,
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
