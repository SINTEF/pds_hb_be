import express from 'express';
import dataInstanceController from '../controllers/dataInstance';

const router = express.Router();

router.get('/', dataInstanceController.getAll);
router.get('/anonymized', dataInstanceController.getAnonymized);
router.get('/:_id', dataInstanceController.getOne);
router.post('/', dataInstanceController.register);
router.put('/:_id', dataInstanceController.update);

export default router;
