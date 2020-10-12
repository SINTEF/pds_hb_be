import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const update = (req: express.Request, res: express.Response): void => {
  db.connect();

  const { obj_id, name, size, design, revisionDate, remarks, description, L3, data, module, equipmentGroup } = req.body;

  if (!name || !data || !module || !equipmentGroup || !L3) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  ComponentModel.findOneAndUpdate(
    { _id: obj_id },
    {
      name: name,
      size: size,
      design: design,
      revisionDate: revisionDate,
      remarks: remarks,
      description: description,
      L3,
      data: data,
      module: module,
      equipmentGroup: equipmentGroup,
    },
    { useFindAndModify: false }
  )
    .then((component) => {
      res.status(200).send({
        success: true,
        message: 'Component successfully updated',
        data: component,
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

//
export default update;
