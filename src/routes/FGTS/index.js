import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import fgtsController from '../../controllers/fgts/index.js';

const router = new Router();

router.get('/', privateRoute, fgtsController.index);
router.post('/', privateRoute, fgtsController.store);

router.get('/:cpf', privateRoute, fgtsController.show);
router.patch('/:cpf', privateRoute, fgtsController.update);
router.delete('/:cpf', privateRoute, fgtsController.delete);

router.post('/filter', privateRoute, fgtsController.filter);

export default router;