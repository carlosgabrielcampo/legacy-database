import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import privateRoute from '../../middlewares/controlAccess/index.js';
import logsController from '../../controllers/logs/index.js';
import wsController from '../../controllers/logs/ws.js';
import passiveController from '../../controllers/logs/passive.js';
import lariLogsController from '../../controllers/logs/lari_logs.js';
const router = new Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join("./docs/import/logs"));
    },
    filename: (req, file, cb) => {
        cb(null, `contracts_${new Date().getTime()}.json`);
    },
});

const upload = multer({ storage });

router.get('/phone', privateRoute, logsController.phone);
router.get('/filter/', privateRoute, logsController.show);


router.post('/larilogs/multiple', privateRoute, lariLogsController.createMultiple)
router.get('/larilogs/multiple', privateRoute, lariLogsController.findMultiple)
router.post('/larilogs', privateRoute, lariLogsController.create)
router.put('/larilogs/multipleUpdate', privateRoute, lariLogsController.multipleupdate)
router.put('/larilogs/update', privateRoute, lariLogsController.update)
router.delete('/larilogs/:id', privateRoute, lariLogsController.delete)

router.get('/ws', privateRoute, wsController.index);
router.post('/ws/multiple', privateRoute, wsController.storeMultiple);
router.post('/ws', privateRoute, wsController.store);
router.put('/ws/:id', privateRoute, wsController.update);
router.patch('/ws/:id', privateRoute, wsController.update);
router.delete('/ws/:id', privateRoute, wsController.delete);

router.get('/passive', privateRoute, passiveController.index);
router.post('/passive/multiple', privateRoute, passiveController.storeMultiple);
router.post('/passive', privateRoute, passiveController.store);
router.put('/passive/:id', privateRoute, passiveController.update);
router.patch('/passive/:id', privateRoute, passiveController.update);
router.delete('/passive/:id', privateRoute, passiveController.delete);

router.put('/:id', privateRoute, logsController.update);
router.patch('/:id', privateRoute, logsController.update);
router.delete('/:id', privateRoute, logsController.delete);
router.get('/', privateRoute, logsController.index);
router.post('/', privateRoute, logsController.store);


export default router;