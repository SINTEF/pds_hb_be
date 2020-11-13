import express from 'express';
import db from '../../db';
import { ComponentModel, ModuleModel } from '../../models';

const updateModule = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { newName, oldName } = req.body;

  if (!newName || !oldName) {
    res.status(400).send({
      success: false,
      message: 'Missing parameters',
    });
  }

  const module = await ModuleModel.updateOne({ name: oldName }, { name: newName });

  if (!module) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong during update',
    });
  }

  const components = await ComponentModel.updateMany({ module: oldName }, { module: newName });

  if (!components) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong during update',
    });
  }

  res.send({
    success: true,
    data: {
      module,
      components,
    },
  });
};

export default updateModule;
