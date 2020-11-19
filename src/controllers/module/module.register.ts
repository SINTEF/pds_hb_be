import express from 'express';
import db from '../../db';
import { ModuleModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { name, equipmentGroups } = req.body;

  if (!name || !equipmentGroups) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  const newModule = new ModuleModel({
    name,
    equipmentGroups,
  });

  newModule
    .save()
    .then((module) =>
      res.status(200).send({
        success: true,
        message: 'Module successfully created',
        data: module,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when trying to register a new module',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
