import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const getAll = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const query = req.query;

  DataInstanceModel.find(query)
    .then((dataInstances) => {
      res.status(200).send({
        success: true,
        data: dataInstances,
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
