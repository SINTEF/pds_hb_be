import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('/', componentController.register);
router.put('/', componentController.update);
router.get('/', componentController.getAll);
router.get('/:componentId', componentController.getOne);

export default router;
