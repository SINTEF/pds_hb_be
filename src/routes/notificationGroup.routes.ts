import express from 'express';
import passport from 'passport';
import notificationGroupController from '../controllers/notificationGroup';

const router = express.Router();

router.get('/', notificationGroupController.getAll);
router.get('/:_id', notificationGroupController.getOne);
router.post('/', notificationGroupController.register);
router.put('/:_id', notificationGroupController.update);
router.delete('/:_id', notificationGroupController.del);

export default router;
