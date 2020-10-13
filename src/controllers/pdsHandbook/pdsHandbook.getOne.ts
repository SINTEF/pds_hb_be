import express from 'express';
import db from '../../db';
import { PdsHandbookModel } from '../../models';

const getOne = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { chapterId } = req.params;

  PdsHandbookModel.findOne({ chapterId })
    .then((handbook) => {
      if (handbook == null) {
        res.status(404).send({
          success: false,
          message: 'Chapter do not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          data: handbook,
        });
      }
    })
    .catch((err) =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs',
        error: err,
      })
    );
};

export default getOne;
