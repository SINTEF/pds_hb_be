import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const update = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();

  const { obj_id, name, size, design, revisionDate, remarks, description, data, module, equipmentGroup } = req.body;

  if (!name || !data || !module || !equipmentGroup) {
    res.status(400).send({
      success: false,
      message: 'Required fields missing',
    });
    return;
  }

  await ComponentModel.findOneAndUpdate(
    { _id: obj_id },
    {
      name: name,
      size: size,
      design: design,
      revisionDate: revisionDate,
      remarks: remarks,
      description: description,
      data: data,
      module: module,
      equipmentGroup: equipmentGroup,
    },
    { useFindAndModify: false }
  )
    .then((component) => {
      res.status(200).send({
        success: true,
        message: 'Component successfully updated! Updated company document:',
        document: component,
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
