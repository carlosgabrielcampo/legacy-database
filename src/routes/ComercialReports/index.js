import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import comercialReportsController from '../../controllers/comercialReports/index.js';

const router = new Router();

router.get('/', privateRoute, comercialReportsController.index);
router.post('/', privateRoute, comercialReportsController.store);

router.get('/:id', privateRoute, comercialReportsController.show);
router.patch('/:id', privateRoute, comercialReportsController.update);
router.delete('/:id', privateRoute, comercialReportsController.delete);

router.post('/filter', privateRoute, comercialReportsController.filter);

router.get('/seller/:id', privateRoute, comercialReportsController.sellerReports);

export default router;