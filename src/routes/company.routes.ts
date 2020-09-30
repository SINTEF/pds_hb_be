import express from 'express';
import companyController from '../controllers/company/';

const router = express.Router();

// proposement for changing to this convention
router.post('/register', companyController.registerCompany);


export default router;