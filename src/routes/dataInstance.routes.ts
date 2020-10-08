import express from 'express';
import dataInstanceController from '../controllers/dataInstance';

const router = express.Router();

router.get('/', dataInstanceController.getAll);
router.get('/:_id', dataInstanceController.getOne);
router.post('/', dataInstanceController.register);
router.put('/', dataInstanceController.update);

export default router;
