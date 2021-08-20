import express from 'express';
import inventoryInstanceController from '../controllers/inventoryInstance';

const router = express.Router();

router.get('/', inventoryInstanceController.getAll);
router.get('/anonymized', inventoryInstanceController.getAnonymized);
router.get('/:_id', inventoryInstanceController.getOne);
router.post('/', inventoryInstanceController.register);
router.put('/:_id', inventoryInstanceController.update);
router.delete('/:_id', inventoryInstanceController.del);

export default router;
