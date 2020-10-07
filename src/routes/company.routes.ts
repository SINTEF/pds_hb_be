import express from 'express';
import companyController from '../controllers/company/';

const router = express.Router();

router.post('/register', companyController.register);
router.post('/update', companyController.update);

export default router;
