import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';
import bcrypt from 'bcrypt';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const body = req.body;

  const _id = req.params.username;
  const isAuthorized = checkAuthorization(req, res, { checkAdminOrUser: true, userId: _id });
  if (!isAuthorized) return;

  if (body.password) {
    const passwordHash = await bcrypt.hash(body.password, 10).catch(() =>
      res.status(400).send({
        success: false,
        message: 'Password must be a string.',
      })
    );
    if (!passwordHash) return;
    delete body.password;
    body.passwordHash = passwordHash;
  }

  UserModel.findOneAndUpdate({ username: _id }, { $set: body }, { useFindAndModify: false, new: true })
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
