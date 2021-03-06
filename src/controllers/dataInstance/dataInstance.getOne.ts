import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

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

  DataInstanceModel.findOne({ _id })
    .then((dataInstance) => {
      res.status(200).send({
        success: true,
        data: dataInstance,
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
