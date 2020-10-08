import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.get('/:objectId', componentController.get);
router.post('/', componentController.register);
router.put('/', componentController.update);

export default router;
