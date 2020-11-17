import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapterId, text, editedBy } = req.body;

  if (!chapterId || !text || !editedBy) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  const newPdsHandbook = new PdsHandbookModel({
    chapterId,
    text,
    editedBy,
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
