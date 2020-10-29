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

  if (typeof username !== 'string') {
    res.status(400).send({
      success: false,
      message: 'Username must be of type string',
    });
    return;
  }

  const user = (await UserModel.findOne({ username: username.toLowerCase() }).then((user) => user)) as IUserDocument | null;

  if (!user) {
    res.status(400).send({
      success: false,
      message: 'User not found',
    });
    return;
  }

  if (user.userGroupType === 'none') {
    res.status(400).send({
      success: false,
      message: 'This user has not yet been approved.',
    });
    return;
  }

  const authorized = await bcrypt.compare(password, user.passwordHash).catch(() =>
    res.status(409).send({
      success: false,
      message: 'Something wrong with password input',
    })
  );
  if (res.statusCode === 409) return;

  if (!authorized) {
    res.status(400).send({
      success: false,
      message: 'Wrong password',
    });
    return;
  }

  // IF SUCCESS:
  const { token } = issueJWT(user);
  res.status(200).send({
    success: true,
    message: 'User authorized',
    data: user,
    token,
  });
};

export default login;
