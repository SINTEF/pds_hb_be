import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

// Finds all components based on  equipment group
const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const equipmentGroup = req.query;

  if (!equipmentGroup) {
    res.status(400).send({
      success: false,
      message: 'No equipment group received.',
    });
    return;
  }

  ComponentModel.find(equipmentGroup)
    .then((component) => {
      res.status(200).send({
        success: true,
        data: component,
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
