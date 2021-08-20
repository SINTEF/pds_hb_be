import express from 'express';
import db from '../../db';
import { InventoryInstanceModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  const { _id } = req.params;

  InventoryInstanceModel.findOneAndDelete({ _id })
    .then((inventoryInstance) => {
      if (!inventoryInstance) {
        res.status(404).send({
          success: false,
          message: 'inventoryInstance does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'inventoryInstance successfully deleted',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Something wrong with inputs',
        Error: err,
      });
    });
};

export default del;
