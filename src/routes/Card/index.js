import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import contractController from '../../controllers/card/index.js';

const router = new Router();

router.get('/', privateRoute, contractController.index);
router.post('/', privateRoute, contractController.store);

router.get('/nb/:benefit_number', privateRoute, contractController.showByBenefit);
router.get('/:card_identifier', privateRoute, contractController.show);
router.patch('/:card_identifier', privateRoute, contractController.patch);
router.put('/:card_identifier', privateRoute, contractController.put);
router.delete('/:card_identifier', privateRoute, contractController.delete);

router.post('/filter', privateRoute, contractController.filter);
export default router;