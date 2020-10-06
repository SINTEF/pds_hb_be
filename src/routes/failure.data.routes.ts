import express from 'express';
import failureDataController from '../controllers/failureData/';

const router = express.Router();

router.post('/add-failure-data', failureDataController.register);

export default router;
