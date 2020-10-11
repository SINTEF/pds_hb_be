import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const register = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { company, facility, component, startDate, endDate, T, du, populationSize } = req.body;

  if (!company || !facility || !component || !T || !du) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const newDataInstance = new DataInstanceModel({
    company,
    facility,
    component,
    startDate,
    endDate,
    T,
    du,
    populationSize,
  });

  newDataInstance
    .save()
    .then((dataInstance) =>
      res.status(200).send({
        success: true,
        message: 'Data instance successfully created',
        data: dataInstance,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating data instance.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
