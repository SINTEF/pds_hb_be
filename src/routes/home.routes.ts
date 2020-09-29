import express from 'express';
import homeController from '../controllers/home/';

const router = express.Router();

router.get('/', homeController.index);
router.get('/test/:name', homeController.testQuery);

export default router;
