import express from 'express';
import passport from 'passport';
import userController from '../controllers/user/';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:username', passport.authenticate('jwt', { session: false }), userController.update);
router.get('/', passport.authenticate('jwt', { session: false }), userController.getAll);
router.delete('/:_id', passport.authenticate('jwt', { session: false }), userController.del);

export default router;
