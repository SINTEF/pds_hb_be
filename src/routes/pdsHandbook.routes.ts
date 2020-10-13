import express from 'express';
import pdsHandbookController from '../controllers/pdsHandbook/';

const router = express.Router();

router.post('/', pdsHandbookController.register);
router.get('/:chapterId', pdsHandbookController.getOne);

export default router;
