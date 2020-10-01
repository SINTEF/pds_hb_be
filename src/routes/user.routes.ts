import express from 'express';
import userController from '../controllers/user/';
import { paginatedResults } from '../utils/paginations';
import { UserModel } from '../models/user/user.model';

const router = express.Router();

router.post('/register', userController.register);
router.get('/login', userController.login);

// Get request to test pagination
router.get('/users', paginatedResults(UserModel));

export default router;
