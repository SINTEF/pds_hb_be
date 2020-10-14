import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  ComponentModel.findOneAndUpdate({ name: req.params.name }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((component) => {
      res.status(200).send({
        success: true,
        message: 'Component successfully updated',
        data: component,
      });
    })
    .catch((err) => {
      res.status(409).send({
        success: false,
        message: 'Error: Values not unique',
        duplicateField: err.keyValue,
        error: err,
      });
    });
};

//
export default update;
