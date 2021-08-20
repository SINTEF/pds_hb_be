import express from 'express';
import db from '../../db';
import { CommentModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const del = (req: express.Request, res: express.Response): void => {
  const { _id } = req.params;

  CommentModel.findOneAndDelete({ _id })
    .then((comment) => {
      if (!comment) {
        res.status(404).send({
          success: false,
          message: 'comment does not exist',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'comment successfully deleted',
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
