import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import privateRoute from '../../middlewares/controlAccess/index.js';
import contractController from '../../controllers/contract/index.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "docs", "import", "contract"));
    },
    filename: (req, file, cb) => {
        cb(null, `contracts_${new Date().getTime()}.json`);
    },
});

const upload = multer({ storage });

const router = new Router();

router.get('/', privateRoute, contractController.index);
router.post('/', privateRoute, contractController.store);

router.get('/nb/:benefit_number', privateRoute, contractController.showByBenefit);

router.get('/:contract_identifier', privateRoute, contractController.show);
router.patch('/:contract_identifier', privateRoute, contractController.patch);
router.put('/:contract_identifier', privateRoute, contractController.update);
router.delete('/:contract_identifier', privateRoute, contractController.delete);

router.post('/filter', privateRoute, contractController.filter);
router.get('/count/bank/:code', privateRoute, contractController.countBank);

router.put('/import', privateRoute, upload.single("file"), contractController.importUpdate);
router.post('/import', privateRoute, upload.single("file"), contractController.importStore);

router.post('/insert/daycoval', privateRoute, contractController.daycovalInsert);
router.post('/insert/bmg', privateRoute, contractController.bmgInsert);
export default router;