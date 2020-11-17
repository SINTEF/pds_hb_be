import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapterId } = req.params;

  const isAuthorized = checkAuthorization(req, res, { checkAdmin: true });
  if (!isAuthorized) return;

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
          message: 'Chapter successfully deleted',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: 'Something wrong with inputs',
        Error: err,
      });
    });
};

export default del;
