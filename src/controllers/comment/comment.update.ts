import express from 'express';
import db from '../../db';
import { CommentModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const _id = req.params._id;
  const comment = await CommentModel.findOne({ _id }).then((comment) => comment);
  const companyName = comment?.company;

  const isAuthorized = checkAuthorization(req, res, { checkAdminOrCompany: true, companyName });
  if (!isAuthorized) return;

  CommentModel.findOneAndUpdate({ _id }, { $set: req.body }, { useFindAndModify: false, new: true })
    .then((comment) => {
      res.status(200).send({
        success: true,
        message: 'Comment successfully updated',
        data: comment,
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
