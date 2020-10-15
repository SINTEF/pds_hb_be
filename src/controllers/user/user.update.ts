import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  UserModel.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((user) => {
      res.status(200).send({
        success: true,
        message: 'Successfully updated user data',
        data: user,
      });
    })
    .catch((err) => {
      res.status(409).send({
        success: false,
        message: 'Error: Values not unique',
        duplicateField: err.keyValue,
      });
    });
};

export default update;
