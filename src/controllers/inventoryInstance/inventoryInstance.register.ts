import express from 'express';
import db from '../../db';
import { InventoryInstanceModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company, facility, tag, tagDescription, equipmentGroupL2, vendor, equipmentModel, startDate, L3 } = req.body;

  if (!company || !facility || !tag || !equipmentGroupL2) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const newInventoryInstance = new InventoryInstanceModel({
    company,
    facility,
    tag,
    equipmentGroupL2,
    vendor,
    equipmentModel,
    startDate,
    L3,
    tagDescription,
    status: 'not reviewed',
  });

  newInventoryInstance
    .save()
    .then((inventoryInstance) =>
      res.status(200).send({
        success: true,
        message: 'Inventory instance successfully created',
        data: inventoryInstance,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating Inventory instance.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
