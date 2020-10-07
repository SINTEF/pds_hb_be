import express from 'express';
import dataInstanceController from '../controllers/dataInstance';

const router = express.Router();

router.post('/', dataInstanceController.register);
router.put('/', dataInstanceController.update);

export default router;
