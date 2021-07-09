import express from 'express';
import db from '../../db';
import { CommentModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company, notificationNumber, content, author } = req.body;

  if (!company || !notificationNumber || !content) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const newComment = new CommentModel({
    company,
    notificationNumber,
    content,
    author,
  });

  newComment
    .save()
    .then((comment) =>
      res.status(200).send({
        success: true,
        message: 'Comment successfully created',
        data: comment,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating comment.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
