import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db';
import { UserModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { username, password, email, phoneNr, companyName, userGroupType } = req.body;
  if (!username || !password || !email) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields.',
    });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10).catch(() =>
    res.status(400).send({
      success: false,
      message: 'Password must be a string.',
    })
  );
  if (!passwordHash) return;

  if (userGroupType === 'operator') {
    const isAuthorized = checkAuthorization(req, res, { checkAdminOrCompany: true, companyName });
    if (!isAuthorized) return;
  }

  const newUserGroupType = userGroupType === 'operator' ? 'operator' : 'none';

  const newUser = new UserModel({
    username: username.toLowerCase(),
    passwordHash,
    email: email.toLowerCase(),
    phoneNr,
    companyName,
    userGroupType: newUserGroupType,
  });

  newUser
    .save()
    .then(() =>
      res.status(200).send({
        success: true,
        message: 'User successfully created.',
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating user.',
        duplicateField: err.keyValue,
      })
    );
};

export default register;
