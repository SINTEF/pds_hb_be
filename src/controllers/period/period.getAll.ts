import express from 'express';
import db from '../../db';
import { PeriodModel } from '../../models';

// Finds all components based on equipment group
const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  PeriodModel.find(query)
    .then((period) => {
      res.status(200).send({
        success: true,
        data: period,
      });
    })
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs.',
      })
    );
};

export default getAll;
