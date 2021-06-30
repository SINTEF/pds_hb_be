import express from 'express';
import db from '../../db';
import { PeriodModel } from '../../models';

const getOne = (req: express.Request, res: express.Response): void => {
  db.connect();
  const { _id } = req.params;

  PeriodModel.findOne({ _id })
    .then((period) => {
      res.status(200).send({
        success: true,
        data: period,
      });
    })
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default getOne;
