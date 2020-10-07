import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('', componentController.register);
router.put('', componentController.update);

export default router;
