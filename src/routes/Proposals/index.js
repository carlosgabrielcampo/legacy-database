import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import proposalsController from '../../controllers/proposals/index.js';

const router = new Router();

router.get('/', privateRoute, proposalsController.index);
router.post('/', privateRoute, proposalsController.store);

router.get('/:proposal_number', privateRoute, proposalsController.show);
router.patch('/:proposal_number', privateRoute, proposalsController.update);
router.delete('/:proposal_number', privateRoute, proposalsController.delete);

router.post('/filter', privateRoute, proposalsController.filter);

export default router;