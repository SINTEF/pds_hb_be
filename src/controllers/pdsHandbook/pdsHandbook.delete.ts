import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';

const del = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapterId } = req.params;

  PdsHandbookModel.findOneAndDelete({ chapterId: chapterId })
    .then((chapter) => {
      if (!chapter) {
        res.status(404).send({
          success: false,
          message: 'Chapter does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'chapter successfully deleted',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        Error: err,
      });
    });
};

//
export default del;
