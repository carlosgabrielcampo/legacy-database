import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import associateTaxController from '../../controllers/associateTax/index.js'

const router = new Router();

router.get('/', privateRoute, associateTaxController.index);
router.post('/', privateRoute, associateTaxController.store);

router.get('/:benefit_number', privateRoute, associateTaxController.show);
router.patch('/:benefit_number', privateRoute, associateTaxController.update);
router.delete('/:benefit_number', privateRoute, associateTaxController.delete);

router.post('/filter', privateRoute, associateTaxController.filter);

export default router;