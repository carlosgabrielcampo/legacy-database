import { Router } from 'express';

import privateRoute from '../../middlewares/controlAccess/index.js';
import phoneController from '../../controllers/phone/index.js';

const router = new Router();

router.get('/', privateRoute, phoneController.index);
router.post('/', privateRoute, phoneController.store);

router.post('/filter', privateRoute, phoneController.filter);
router.post('/phonescore', privateRoute, phoneController.phoneScore);
router.post('/showMultiple', privateRoute, phoneController.showMultiple);

router.get('/phone', privateRoute, phoneController.phone);
router.get('/:id', privateRoute, phoneController.show);
router.patch('/:id', privateRoute, phoneController.update);
router.delete('/:id', privateRoute, phoneController.delete);


export default router;