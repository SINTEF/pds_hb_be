import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { obj_id, facility, startDate, endDate, T, du, populationSize } = req.body;

  if (!T || !du) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  DataInstanceModel.findOneAndUpdate(
    { _id: obj_id },
    {
      facility: facility,
      startDate: startDate,
      endDate: endDate,
      T: T,
      du: du,
      populationSize: populationSize,
    },
    { useFindAndModify: false }
  )
    .then((dataInstance) => {
      res.status(200).send({
        success: true,
        message: 'Data instance successfully updated',
        data: dataInstance,
      });
    })
    .catch((err) => {
      res.status(409).send({
        success: false,
        message: 'Error: Values not unique',
        duplicateField: err.keyValue,
      });
    });
};

//
export default update;
