import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

interface IQuery {
  companyName?: string;
  userGroupType?: string;
}

// Finds all users by company or approved status
const getAll = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { companyName, userGroupType } = req.query;

  if (!companyName && !userGroupType) {
    res.status(400).send({
      success: false,
      message: 'No company or user group type received',
    });
    return;
  }

  if (userGroupType && userGroupType !== 'none') {
    res.status(400).send({
      success: false,
      message: "Can't query users of userGroupType: " + userGroupType,
    });
    return;
  }

  UserModel.find(req.query)
    .then((users) => {
      res.status(200).send({
        success: true,
        data: users,
      });
    })
    .catch(() =>
      res.status(400).send({
        success: false,
        message: 'Something wrong with inputs.',
      })
    );
};

export default getAll;
