import express from 'express';
import db from '../../db';
import { PeriodModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  const { _id } = req.params;

  PeriodModel.findOneAndDelete({ _id })
    .then((period) => {
      if (!period) {
        res.status(404).send({
          success: false,
          message: 'period does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'period successfully deleted',
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
