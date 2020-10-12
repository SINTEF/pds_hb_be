import express from 'express';
import moduleController from '../controllers/module';

const router = express.Router();

router.get('/', moduleController.getModulesAndEquipmentGroups);
router.post('/', moduleController.register);
router.put('/', moduleController.addEquipmentGroup);

export default router;
