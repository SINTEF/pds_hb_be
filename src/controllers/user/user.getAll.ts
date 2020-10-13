import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

// Finds all components based on  equipment group
const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company } = req.query;

  if (!company || typeof company !== 'string') {
    res.status(400).send({
      success: false,
      message: 'No company received',
    });
    return;
  }

  UserModel.find({ companyName: company })
    .then((users) => {
      res.status(200).send({
        success: true,
        data: users,
      });
    })
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs.',
      })
    );
};

export default getAll;
