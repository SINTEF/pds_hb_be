import express from 'express';
import pdsHandbookController from '../controllers/pdsHandbook/';

const router = express.Router();

router.post('/', pdsHandbookController.register);

export default router;
