import express from 'express';
import db from '../../db';
import { UserModel } from '../../models';

const testQuery = async (req: express.Request, res: express.Response): Promise<void> => {
  db.connect();
  const testQuery = {};

  // Body
  console.log(req.body);
  // Params
  console.log(req.params);
  // Query
  console.log(req.query);

  UserModel.find({}, (err, result) => {
    if (err) throw err;
    console.log('PRINTING ALL USERS:');
    console.log(result);
    res.send('WORKED');
  });
};

export default testQuery;
