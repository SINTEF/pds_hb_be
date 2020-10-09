import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { obj_id, facility, startDate, endDate, T, du, populationSize } = req.body;

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
        message: 'Data instance successfully updated! Updated data instance document:',
        document: dataInstance,
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
