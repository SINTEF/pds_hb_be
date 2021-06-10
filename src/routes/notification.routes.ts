import express from 'express';
import notificationController from '../controllers/notification';

const router = express.Router();

router.get('/', notificationController.getAll);
router.get('/anonymized', notificationController.getAnonymized);
router.get('/:_id', notificationController.getOne);
router.post('/', notificationController.register);
router.put('/:_id', notificationController.update);

export default router;
