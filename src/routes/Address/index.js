import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import addressController from '../../controllers/address/index.js';

const router = new Router();

router.get('/', privateRoute, addressController.index);
router.post('/', privateRoute, addressController.store);

router.get('/:cpf', privateRoute, addressController.show);
router.patch('/:cpf', privateRoute, addressController.update);
router.delete('/:cpf', privateRoute, addressController.delete);

router.post('/filter', privateRoute, addressController.filter);

export default router;