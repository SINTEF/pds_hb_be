import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { username, email, phoneNr } = req.body;

  if (!email) {
    res.status(400).send({
      success: false,
      message: 'Required field missing',
    });
    return;
  }

  await UserModel.findOneAndUpdate(
    { username: username }, // query parameter
    {
      email: email,
      phoneNo: phoneNr,
    },
    { useFindAndModify: false }
  )
    .then(() => {
      res.status(200).send({
        success: true,
        message: 'Successfully updated user data',
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
