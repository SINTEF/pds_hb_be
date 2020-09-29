import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/auth', userController.authenticateUser);

router.get('/getData/:name', userController.getData);

export default router;
