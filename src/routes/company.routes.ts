import express from 'express';
import passport from 'passport';
import companyController from '../controllers/company/';

const router = express.Router();

router.get('/:name', passport.authenticate('jwt', { session: false }), companyController.getOne);
router.post('/', passport.authenticate('jwt', { session: false }), companyController.register);
router.put('/:name', passport.authenticate('jwt', { session: false }), companyController.update);

export default router;
