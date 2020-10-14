import express from 'express';
import companyController from '../controllers/company/';

const router = express.Router();

router.get('/:name', companyController.getOne);
router.post('/', companyController.register);
router.put('/:name', companyController.update);

export default router;
