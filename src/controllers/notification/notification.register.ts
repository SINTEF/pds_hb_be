import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';
import { getT } from '../../utils/getT';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company, facility, component, startDate, endDate, du, populationSize, comment, L3 } = req.body;

  if (!company || !facility || !component || !du) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const T = getT(startDate, endDate, populationSize);
  const failureRates = ((du * 10 ** 6) / T).toPrecision(3);

  const newNotification = new NotificationModel({
    company,
    facility,
    component,
    startDate,
    endDate,
    T,
    du,
    populationSize,
    failureRates,
    comment,
    sintefComment: 'No comment',
    status: 'not reviewed',
    L3,
  });

  newNotification
    .save()
    .then((notification) =>
      res.status(200).send({
        success: true,
        message: 'Data instance successfully created',
        data: notification,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating data instance.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
