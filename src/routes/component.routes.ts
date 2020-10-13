import express from 'express';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('/', componentController.register);
router.put('/:name', componentController.update);
router.get('/', componentController.getAll);
router.get('/:name', componentController.getOne);

export default router;
