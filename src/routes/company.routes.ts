import express from 'express';
import companyController from '../controllers/company/';

const router = express.Router();

router.post('', companyController.register);
router.put('', companyController.update);

export default router;
