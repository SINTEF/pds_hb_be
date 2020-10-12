import express from 'express';
import db from '../../db';
import { ModuleModel } from '../../models';

const getModulesAndEquipmentGroups = (req: express.Request, res: express.Response): void => {
  db.connect();

  ModuleModel.find()
    .then((modules) =>
      res.status(200).send({
        success: true,
        data: modules,
      })
    )
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default getModulesAndEquipmentGroups;
