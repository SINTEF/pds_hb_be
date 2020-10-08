import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const get = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;

  DataInstanceModel.findOne({ _id })
    .then((dataInstance) => {
      res.status(200).send({
        success: true,
        payload: dataInstance,
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

export default get;
