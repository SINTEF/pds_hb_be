import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';

const getOne = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;

  DataInstanceModel.findOne({ _id })
    .then((dataInstance) => {
      res.status(200).send({
        success: true,
        data: dataInstance,
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

const getAll = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  // company=Equinor&component=flame+detector in URL results in
  const query = req.query; // query = { company: 'Equinor', component: 'flame detector' }

  DataInstanceModel.find(query)
    .then((dataInstances) => {
      res.status(200).send({
        success: true,
        data: dataInstances,
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

export { getOne, getAll };
