import express from 'express';

// import HomeModel from '../models/...'
// example names for functions: home_index, home_create_get, home_create_post

const home_index = (req: express.Request, res: express.Response): void => {
  res.send('Welcome home');
};

export default {
  home_index,
};
