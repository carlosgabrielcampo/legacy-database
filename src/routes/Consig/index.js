import { Router } from 'express';
import multer from 'multer';
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import privateRoute from '../../middlewares/controlAccess/index.js';
import consigController from '../../controllers/consig/index.js';

let __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "docs", "import", "consig"));
    },
    filename: (req, file, cb) => {
        cb(null, `consigs_${new Date().getTime()}.json`);
    },
});

const upload = multer({ storage });

const router = new Router();

router.get('/', privateRoute, consigController.index);
router.post('/', privateRoute, consigController.store);

router.get('/cpf/:cpf', privateRoute, consigController.showByCpf);
router.get('/:benefit_number', privateRoute, consigController.show);
router.get('/:benefit_number/full', privateRoute, consigController.showFull);
router.put('/:benefit_number', privateRoute, consigController.update);
router.patch('/:benefit_number', privateRoute, consigController.patch);
router.delete('/:benefit_number', privateRoute, consigController.delete);

router.post('/filter', privateRoute, consigController.filter);

router.post('/import/update', privateRoute, upload.single("file"), consigController.importUpdate);
router.post('/import', privateRoute, upload.single("file"), consigController.importStore);

export default router;