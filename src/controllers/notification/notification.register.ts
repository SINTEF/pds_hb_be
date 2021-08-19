import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';
import { getT } from '../../utils/getT';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const {
    company,
    notificationNumber,
    detectionDate,
    equipmentGroupL2,
    tag,
    shortText,
    longText,
    workOrder,
    activityText,
    detectionMethod,
    F1,
    F2,
    failureType,
    commonFailure,
    repeatingFailure,
    operatorComment,
  } = req.body;

  if (!company || !notificationNumber || !detectionDate || !tag || !equipmentGroupL2) {
    res.status(400).send({
      success: false,
      message: 'Missing required fields',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const newNotification = new NotificationModel({
    company,
    notificationNumber,
    detectionDate,
    equipmentGroupL2,
    tag,
    shortText,
    longText,
    workOrder,
    activityText,
    detectionMethod,
    F1,
    F2,
    failureType,
    qualityStatus: false,
    commonFailure,
    repeatingFailure,
    operatorComment,
    status: 'not reviewed',
  });

  newNotification
    .save()
    .then((notification) =>
      res.status(200).send({
        success: true,
        message: 'Notification successfully created',
        data: notification,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when creating notification.',
        duplicateField: err.keyValue,
        error: err,
      })
    );
};

export default register;
