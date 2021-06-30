import express from 'express';
import db from '../../db';
import { NotificationGroupModel } from '../../models';

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

  NotificationGroupModel.findOne({ _id })
    .then((notificationGroup) => {
      res.status(200).send({
        success: true,
        data: notificationGroup,
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
