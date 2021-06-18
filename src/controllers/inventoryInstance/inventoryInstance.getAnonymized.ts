import express from 'express';
import db from '../../db';
import { InventoryInstanceModel } from '../../models';
import { getFacilityAlias } from '../../utils/getFacilityAlias';
import { getCompanyAlias } from '../../utils/getCompanyAlias';

const getAnonymized = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;
  const { component } = req.query;

  if (Object.keys(query).length !== 0 && !component) {
    res.status(400).send({
      success: false,
      message: 'Not allowed to query anything else than company and component',
    });
    return;
  }

  InventoryInstanceModel.find(query)
    .then(async (inventoryInstances) => {
      const anonymizedInventoryInstances = await Promise.all(
        inventoryInstances.map(async (inventoryInstance) => {
          const newInventoryInstance = inventoryInstance;
          const companyAlias = await getCompanyAlias(inventoryInstance.company);

          newInventoryInstance.company = companyAlias?.alias ? companyAlias.alias.toString() : '';
          return newInventoryInstance;
        })
      );
      res.status(200).send({
        success: true,
        data: anonymizedInventoryInstances,
      });
    })
    .catch((err) =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
        error: err,
      })
    );
};

export default getAnonymized;
