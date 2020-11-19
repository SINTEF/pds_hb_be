import express from 'express';
import db from '../../db';
import { DataInstanceModel } from '../../models';
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

  DataInstanceModel.find(query)
    .then(async (dataInstances) => {
      const anonymizedDataInstances = await Promise.all(
        dataInstances.map(async (dataInstance) => {
          const newDataInstance = dataInstance;
          const companyAlias = await getCompanyAlias(dataInstance.company);
          const facilityAlias = await getFacilityAlias(dataInstance.facility);

          newDataInstance.company = companyAlias?.alias ? companyAlias.alias.toString() : '';
          newDataInstance.facility = facilityAlias?.alias || '';
          return newDataInstance;
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
