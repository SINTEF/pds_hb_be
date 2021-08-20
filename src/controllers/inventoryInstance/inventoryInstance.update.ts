import express from 'express';
import db from '../../db';
import { InventoryInstanceModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const inventoryInstance = await InventoryInstanceModel.findOne({ _id }).then((inventoryInstance) => inventoryInstance);
  const companyName = inventoryInstance?.company;

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName });
  if (!isAuthorized) return;

  InventoryInstanceModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((inventoryInstance) => {
      res.status(200).send({
        success: true,
        message: 'Inventory instance successfully updated',
        data: inventoryInstance,
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
