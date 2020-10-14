import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

const del = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { _id } = req.params;

  UserModel.findOneAndDelete({ _id })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          success: false,
          message: 'User does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'User successfully deleted',
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
