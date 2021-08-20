import express from 'express';
import passport from 'passport';
import commentController from '../controllers/comment';

const router = express.Router();

router.get('/', commentController.getAll);
router.get('/:_id', commentController.getOne);
router.post('/', commentController.register);
router.put('/:_id', commentController.update);
router.delete('/:_id', commentController.del);

export default router;
