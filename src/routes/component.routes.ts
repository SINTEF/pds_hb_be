import express from 'express';
import passport from 'passport';
import componentController from '../controllers/component/';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), componentController.register);
router.put('/:_id', passport.authenticate('jwt', { session: false }), componentController.update);
router.get('/', passport.authenticate('jwt', { session: false }), componentController.getAll);
router.get('/:_id', passport.authenticate('jwt', { session: false }), componentController.getOne);

export default router;
