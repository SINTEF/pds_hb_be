import express from 'express';
import db from '../../db';
import { ComponentModel } from '../../models';

const get = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const { _id } = req.params;

  // IS THE FOLLOWING OVERKILL? IF IT GETS HERE ID MUST EXIST?
  if (!_id) {
    res.status(400).send({
      success: false,
      message: 'No id received',
    });
    return;
  }

  ComponentModel.findOne({ _id })
    .then((component) => {
      res.status(200).send({
        success: true,
        data: component,
      });
    })
    .catch(() =>
      res.status(404).send({
        success: false,
        message: 'Something wrong with inputs',
      })
    );
};

export default get;
