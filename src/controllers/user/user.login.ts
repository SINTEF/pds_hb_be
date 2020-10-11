import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db';
import { UserModel } from '../../models';
import { IUserDocument } from '../../models/user/user.types';
import { issueJWT } from '../../utils/issueJWT';

const login = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  const userQuery = username && { username: username.toLowerCase() };

  const user = (await UserModel.findOne({ ...userQuery })
    .then((user) => {
      return user;
    })
    .catch(() =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    )) as IUserDocument | null;

  if (!user) {
    res.status(404).send({
      success: false,
      message: 'User not found',
    });
    return;
  }

  const authorized = await bcrypt.compare(password, user.passwordHash).catch(() =>
    res.status(409).send({
      success: false,
      message: 'Something wrong with password input',
    })
  );

  if (!authorized)
    res.status(400).send({
      success: false,
      message: 'Wrong password',
    });

  // IF SUCCESS:
  const { token } = issueJWT(user);
  res.status(200).send({
    success: true,
    message: 'User authorized',
    data: user,
    token,
    //expiresIn,
  });
};

export default login;
