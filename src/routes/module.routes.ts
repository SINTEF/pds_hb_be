import express from 'express';
import moduleController from '../controllers/module';

const router = express.Router();

router.get('/', moduleController.getModulesAndEquipmentGroups);
router.post('/', moduleController.register);
router.put('/', moduleController.addEquipmentGroup);
router.put('/rename', moduleController.updateModule);
router.put('/equipmentGroup', moduleController.updateEquipmentGroup);

export default router;
