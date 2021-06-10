import express from 'express';
import db from '../../db';
import { NotificationModel } from '../../models';
import { getFacilityAlias } from '../../utils/getFacilityAlias';
import { getCompanyAlias } from '../../utils/getCompanyAlias';

const getAnonymized = (req: express.Request, res: express.Response): void => {
  db.connect();

  const query = req.query;
  const { component } = req.query;

  if (Object.keys(query).length !== 0 && !component) {
    res.status(400).send({
      success: false,
      message: 'Not allowed to query anything else than company and component',
    });
    return;
  }

  NotificationModel.find(query)
    .then(async (notifications) => {
      const anonymizedDataInstances = await Promise.all(
        notifications.map(async (notification) => {
          const newNotification = notification;
          const companyAlias = await getCompanyAlias(notification.company);
          const facilityAlias = await getFacilityAlias(notification.facility);

          newNotification.company = companyAlias?.alias ? companyAlias.alias.toString() : '';
          newNotification.facility = facilityAlias?.alias || '';
          return newNotification;
        })
      );
      res.status(200).send({
        success: true,
        data: anonymizedDataInstances,
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

export default getAnonymized;
