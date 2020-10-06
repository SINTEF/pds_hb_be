import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('/register', componentController.register);

export default router;
