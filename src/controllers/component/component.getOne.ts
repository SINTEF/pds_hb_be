import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const getOne = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { name } = req.params;

  ComponentModel.findOne({ name })
    .then((component) => {
      res.status(200).send({
        success: true,
        data: component,
      });
    })
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default getOne;
