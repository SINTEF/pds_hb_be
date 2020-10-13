import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapters } = req.body;

  if (!chapters) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const newPdsHandbook = new PdsHandbookModel({
    chapters,
  });

  newPdsHandbook
    .save()
    .then((pdsHandbook) =>
      res.status(200).send({
        success: true,
        message: 'PDS Handbook successfully created',
        data: pdsHandbook,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating PDS Handbook.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
