import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';

const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  PdsHandbookModel.find(query)
    .then((handbook) => {
      res.status(200).send({
        success: true,
        data: handbook,
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
