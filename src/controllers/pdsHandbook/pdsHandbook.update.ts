import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { text, editedBy } = req.body;

  if (!text) {
    res.status(400).send({
      success: false,
      message: 'Text field required, missing',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

  PdsHandbookModel.findOneAndUpdate(
    { chapterId: req.params.chapterId },
    {
      text: text,
      editedBy: editedBy,
      lastUpdated: new Date(),
    },
    { useFindAndModify: false, new: true }
  )
    .then((chapter) => {
      res.status(200).send({
        success: true,
        message: 'Chapter successfully updated',
        data: chapter,
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

//
export default update;
