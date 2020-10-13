import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapterId } = req.params;
  const { text, editedBy } = req.body;

  if (!text) {
    res.status(400).send({
      success: false,
      message: 'Text field required, missing',
    });
    return;
  }

  PdsHandbookModel.findOneAndUpdate(
    { chapterId: chapterId },
    {
      text: text,
      editedBy: editedBy,
      lastUpdated: new Date(),
    },
    { useFindAndModify: false }
  )
    .then((originalDoc) => {
      console.log(originalDoc);
      res.status(200).send({
        success: true,
        message: 'Chapter successfully updated',
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
