import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { obj_id, facility, startPeriod, endPeriod, T, du, populationSize } = req.body;

  if (!T || !du) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  await DataInstanceModel.findOneAndUpdate(
    { _id: obj_id },
    {
      facility: facility,
      startPeriod: startPeriod,
      endPeriod: endPeriod,
      T: T,
      du: du,
      populationSize: populationSize,
    },
    { useFindAndModify: false }
  )
    .then(() => {
      res.status(200).send({
        success: true,
        message: 'Successfully updated the database',
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
