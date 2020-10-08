import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const get = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const name = req.params.name;

  CompanyModel.findOne({ name })
    .then((company) => {
      res.status(200).send({
        success: true,
        payload: company,
      });
    })
    .catch(() =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default get;
