import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import documentController from '../../controllers/document/index.js';

const router = new Router();

router.get('/', privateRoute, documentController.index);
router.post('/', privateRoute, documentController.store);

router.get('/:cpf', privateRoute, documentController.show);
router.patch('/:cpf', privateRoute, documentController.update);
router.delete('/:cpf', privateRoute, documentController.delete);

router.post('/filter', privateRoute, documentController.filter);

export default router;