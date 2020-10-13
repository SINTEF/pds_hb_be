import express from 'express';
import pdsHandbookController from '../controllers/pdsHandbook/';

const router = express.Router();

router.delete('/:chapterId', pdsHandbookController.del);
router.post('/', pdsHandbookController.register);
router.put('/:chapterId', pdsHandbookController.update);
router.get('/:chapterId', pdsHandbookController.getOne);
router.get('/', pdsHandbookController.getAll);

export default router;
