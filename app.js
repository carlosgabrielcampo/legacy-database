import './src/database/index.js';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from "url";
import dateNow from "./src/utils/LocalDate/index.js";

import * as routes from './src/routes/index.js';
import { DatabaseSearch } from './src/database/index2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file  = fs.readFileSync(path.join(__dirname, "docs", "swagger", "index.yaml"), 'utf8');
const swaggerDocument = YAML.parse(file);

const whiteList = process.env.WHITE_LIST;
// const corsOptions = {
//   origin(origin, callback) {
//     const regex = /:\d{4}/;
//     const originURL = regex.test(origin) ? origin.split(regex)[0] : origin;
//     console.info(dateNow(), 'origin', originURL);
//     if (whiteList.indexOf(originURL) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS.'));
//     }
//   },
// };

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api/v1/reports/comercial', routes.comercialReports);
    this.app.use('/api/v1/weightedtax', routes.weightedTax);
    this.app.use('/api/v1/card', routes.card);
    this.app.use('/api/v1/client', routes.client);
    this.app.use('/api/v1/consig', routes.consig);
    this.app.use('/api/v1/contract', routes.contract);
    this.app.use('/api/v1/phone', routes.phone);
    this.app.use('/api/v1/document', routes.document);
    this.app.use('/api/v1/address', routes.address);
    this.app.use('/api/v1/bankdata', routes.bankdata);
    this.app.use('/api/v1/associatetax', routes.associatetax);
    this.app.use('/api/v1/fgts', routes.fgts);
    this.app.use('/api/v1/proposals', routes.proposals);
    this.app.use('/api/v1/logs', routes.logs);
    this.app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

const port = process.env.APP_PORT;
new App().app.listen(port);

// new DatabaseSearch().updateLariLogs()
