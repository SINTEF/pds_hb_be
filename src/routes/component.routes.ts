import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('/register', componentController.register);
router.put('/update', componentController.update);

export default router;
