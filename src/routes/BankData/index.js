import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import bankDataController from '../../controllers/bankData/index.js';

const router = new Router();

router.get('/', privateRoute, bankDataController.index);
router.post('/', privateRoute, bankDataController.store);

router.get('/:id', privateRoute, bankDataController.show);
router.patch('/:id', privateRoute, bankDataController.update);
router.delete('/:id', privateRoute, bankDataController.delete);

router.post('/filter', privateRoute, bankDataController.filter);

export default router;