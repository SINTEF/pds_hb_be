import express from 'express';
import db from '../../db';
import { ModuleModel } from '../../models';
import { IModuleDocument } from '../../models/module/module.types';
import { checkAuthorization } from '../../utils/authorize';

const addEquipmentGroup = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { name, equipmentGroup } = req.body;

  if (!name || !equipmentGroup) {
    res.status(400).send({
      success: false,
      message: 'Something wrong with parameters',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  const module = (await ModuleModel.findOne({ name }).then((module) => {
    return module;
  })) as IModuleDocument;

  if (!module) {
    res.status(400).send({
      success: false,
      message: 'Something wrong with inputs',
    });
    return;
  }

  if (module.equipmentGroups.includes(equipmentGroup)) {
    res.status(400).send({
      success: false,
      message: 'Equipment group already exists in that module',
    });
    return;
  }

  module.equipmentGroups.push(equipmentGroup);
  module.save().then((newModule) =>
    res.status(200).send({
      success: true,
      data: newModule,
    })
  );
};

export default addEquipmentGroup;
