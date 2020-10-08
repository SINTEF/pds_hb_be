import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const get = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { objectId } = req.params;

  CompanyModel.findOne({ objectId })
    .then((company) => {
      return company;
    })
    .catch(() =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default get;
