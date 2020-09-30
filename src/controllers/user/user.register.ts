import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db';
import { UserModel } from '../../models';

const register = async (req: express.Request, res: express.Response): Promise<void> => {
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

export default register;