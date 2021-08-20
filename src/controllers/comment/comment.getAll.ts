import express from 'express';
import db from '../../db';
import { CommentModel } from '../../models';

const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;

  CommentModel.find(query)
    .then((comment) => {
      res.status(200).send({
        success: true,
        data: comment,
      });
    })
    .catch((err) =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
        error: err,
      })
    );
};

export default getAll;
