import express from 'express';
import db from '../../db';
import { ComponentModel, ModuleModel } from '../../models';
import { IModuleDocument } from '../../models/module/module.types';
import { checkAuthorization } from '../../utils/authorize';
const updateEquipmentGroup = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { newName, oldName, newModule, oldModule } = req.body;

  if (!newName || !oldName || !newModule || !oldModule) {
    res.status(400).send({
      success: false,
      message: 'Missing parameters',
    });
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  let newModuleFromDb;
  const module = (await ModuleModel.findOne({ name: oldModule }).then((module) => {
    return module;
  })) as IModuleDocument;

  if (!module) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong during update',
    });
  }

  if (newModule === oldModule) {
    module.equipmentGroups = module.equipmentGroups.map((equipmentGroup) => (equipmentGroup === oldName ? newName : equipmentGroup));
  } else {
    module.equipmentGroups = module.equipmentGroups.filter((equipmentGroup) => equipmentGroup !== oldName);

    newModuleFromDb = (await ModuleModel.findOne({ name: newModule }).then((module) => {
      return module;
    })) as IModuleDocument;
    if (!newModuleFromDb) {
      res.status(500).send({
        success: false,
        message: 'Something went wrong during update',
      });
    }
    newModuleFromDb.equipmentGroups = [...newModuleFromDb.equipmentGroups, newName];
  }

  const components = await ComponentModel.updateMany({ equipmentGroup: oldName, module: oldModule }, { equipmentGroup: newName, module: newModule });

  if (!components) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong during update',
    });
  }

  module.save();
  if (newModuleFromDb) {
    newModuleFromDb.save();
  }

  res.send({
    success: true,
    data: {
      module,
      components,
    },
  });
};

export default updateEquipmentGroup;
