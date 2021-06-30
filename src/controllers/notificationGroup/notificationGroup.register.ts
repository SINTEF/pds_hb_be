import express from 'express';
import db from '../../db';
import { NotificationGroupModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';
import { getT } from '../../utils/getT';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company, name, description } = req.body;

  if (!company || !name) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const newNotificationGroup = new NotificationGroupModel({
    company,
    name,
    description,
  });

  newNotificationGroup
    .save()
    .then((notificationGroup) =>
      res.status(200).send({
        success: true,
        message: 'NotificationGroup successfully created',
        data: notificationGroup,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating notificationGroup.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
