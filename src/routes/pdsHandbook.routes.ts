import express from 'express';
import passport from 'passport';
import pdsHandbookController from '../controllers/pdsHandbook/';

const router = express.Router();

router.delete('/:chapterId', passport.authenticate('jwt', { session: false }), pdsHandbookController.del);
router.post('/', passport.authenticate('jwt', { session: false }), pdsHandbookController.register);
router.put('/:chapterId', passport.authenticate('jwt', { session: false }), pdsHandbookController.update);
router.get('/:chapterId', passport.authenticate('jwt', { session: false }), pdsHandbookController.getOne);
router.get('/', passport.authenticate('jwt', { session: false }), pdsHandbookController.getAll);

export default router;
