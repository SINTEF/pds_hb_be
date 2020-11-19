import express from 'express';
import passport from 'passport';
import moduleController from '../controllers/module';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), moduleController.getModulesAndEquipmentGroups);
router.post('/', passport.authenticate('jwt', { session: false }), moduleController.register);
router.put('/', passport.authenticate('jwt', { session: false }), moduleController.addEquipmentGroup);
router.put('/rename', passport.authenticate('jwt', { session: false }), moduleController.updateModule);
router.put('/equipmentGroup', passport.authenticate('jwt', { session: false }), moduleController.updateEquipmentGroup);

export default router;
