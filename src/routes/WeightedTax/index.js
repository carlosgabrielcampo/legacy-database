import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import weightedTaxController from '../../controllers/weightedTax/index.js';

const router = new Router();

router.get('/', privateRoute, weightedTaxController.index);
router.post('/', privateRoute, weightedTaxController.store);

router.get('/:ported', privateRoute, weightedTaxController.show);
router.patch('/:id', privateRoute, weightedTaxController.update);
router.delete('/:id', privateRoute, weightedTaxController.delete);

export default router;