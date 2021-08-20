import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { description, equipmentGroupL2 } = req.body;

  if (!equipmentGroupL2) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  const newComponent = new ComponentModel({
    description,
    equipmentGroupL2,
  });

  newComponent
    .save()
    .then((component) =>
      res.status(200).send({
        success: true,
        message: 'Component successfully created',
        data: component,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when trying to register a new component',
        duplicateField: err.keyValue,
      })
    );
};

export default register;
