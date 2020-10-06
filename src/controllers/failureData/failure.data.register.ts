import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const register = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { facility, period, T, du, populationSize, companyId, componentId } = req.body;
  if (!companyId || !componentId) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
  }

  const newDataInstance = new DataInstanceModel({
    facility,
    period,
    T,
    du,
    populationSize,
    companyId,
    componentId,
  });

  newDataInstance
    .save()
    .then(() =>
      res.status(200).send({
        success: true,
        message: 'Data instance successfully created.',
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating data instance.',
        duplicateField: err.keyValue,
        err,
      })
    );
};

export default register;
