import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), () => console.log('TEST'));

export default router;
