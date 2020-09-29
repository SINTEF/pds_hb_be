import express from 'express';

// Currently a useless query :D
const index = (req: express.Request, res: express.Response): void => {
  res.send('Welcome home');
};

export default index;
