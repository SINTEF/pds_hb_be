import express from 'express';
import db from '../../db';
import { InventoryInstanceModel } from '../../models';

const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  InventoryInstanceModel.find(query)
    .then((inventoryInstances) => {
      res.status(200).send({
        success: true,
        data: inventoryInstances,
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
