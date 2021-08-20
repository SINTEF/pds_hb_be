import express from 'express';
import db from '../../db';
import { PeriodModel } from '../../models';
import { checkAuthorization } from '../../utils/authorize';

const register = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { company, tag, startDate, endDate, numberOfTests } = req.body;

  if (!tag || !startDate || !endDate || !company) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  const isAuthorized = checkAuthorization(req, res, { checkCompany: true, companyName: company });
  if (!isAuthorized) return;

  const newPeriod = new PeriodModel({
    tag,
    startDate,
    endDate,
    company,
    numberOfTests,
  });

  newPeriod
    .save()
    .then((period) =>
      res.status(200).send({
        success: true,
        message: 'Period successfully created',
        data: period,
      })
    )
    .catch((err) =>
      res.status(409).send({
        success: false,
        message: 'Something went wrong when trying to register a new period',
        duplicateField: err.keyValue,
      })
    );
};

export default register;
