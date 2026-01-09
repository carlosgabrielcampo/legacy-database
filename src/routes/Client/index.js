import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import privateRoute from '../../middlewares/controlAccess/index.js';
import clientController from '../../controllers/client/index.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "docs", "import", "client"));
    },
    filename: (req, file, cb) => {
        cb(null, `clients_${new Date().getTime()}.json`);
    },
});

const upload = multer({ storage });

const router = new Router();

router.get('/array', privateRoute, clientController.showArray);
router.get('/search/converted', privateRoute, clientController.search);
router.post('/filter', privateRoute, clientController.filter);
router.put('/import', privateRoute, upload.single("file"), clientController.importUpdate);
router.post('/import', privateRoute, upload.single("file"), clientController.importStore);
router.get('/:cpf', privateRoute, clientController.show);
router.get('/:cpf/full', privateRoute, clientController.showFull);
router.patch('/:cpf', privateRoute, clientController.update);
router.delete('/:cpf', privateRoute, clientController.delete);
router.get('/', privateRoute, clientController.index);
router.post('/', privateRoute, clientController.store);


export default router;