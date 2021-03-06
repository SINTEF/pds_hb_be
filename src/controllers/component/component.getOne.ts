import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const getOne = (req: express.Request, res: express.Response): void => {
  db.connect();
  const { name } = req.params;

  if (!name) {
    res.status(400).send({
      success: false,
      message: 'Something wrong with parameters',
    });
    return;
  }

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
