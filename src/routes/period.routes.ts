import express from 'express';
import passport from 'passport';
import periodController from '../controllers/period';

const router = express.Router();

router.get('/', periodController.getAll);
router.get('/:_id', periodController.getOne);
router.post('/', periodController.register);
router.put('/:_id', periodController.update);
router.delete('/:_id', periodController.del);

export default router;
