import express from 'express';
import indexController from '../controllers/index';
import passport from 'passport';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), indexController.index);
router.get('/test/:name', indexController.testQuery);

export default router;
