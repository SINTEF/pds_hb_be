import express from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from '../models';
import db from '../db';
import { IUserDocument } from '../models/user/user.types';

const createUser = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { username, password, email, userGroupId } = req.body;
  if (!username || !password || !email || !userGroupId) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields.',
    });
  }

  const passwordHash = await bcrypt.hash(password, 10).catch(() =>
    res.status(400).send({
      success: false,
      message: 'Password must be a string.',
    })
  );
  if (!passwordHash) return;

  const newUser = new UserModel({
    username: username.toLowerCase(),
    passwordHash,
    email,
    userGroupId,
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

const authenticateUser = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { username, password } = req.body;

  // TODO: .toLowerCase() --> We currently have an issue: usernames are stored with possible uppercases in database
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

  res.status(authorized ? 200 : 400).send({
    success: authorized,
    message: authorized ? 'User authorized' : 'Wrong password',
  });
};

// Test query
const getData = async (req: express.Request, res: express.Response): Promise<void> => {
  const testQuery = {};

  // Body
  console.log(req.body);
  // Params
  console.log(req.params);
  // Query
  console.log(req.query);

  UserModel.find({ ...testQuery }, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('WORKED');
  });
};

export default {
  createUser,
  authenticateUser,
  getData,
};
