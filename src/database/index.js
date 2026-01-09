import Sequelize from 'sequelize';

import databaseConfig from '../config/database.js';
import * as model from "../models/index.js";


const models = [
    model.Address,
    model.Phone,
    model.BankData,
    model.Document,
    model.Fgts,
    model.Card,
    model.Consig,
    model.Contract,
    model.Client,
    model.WeightedTax,
    model.ComercialReports,
    model.AssociateTax,
    model.Logs,
    model.LariLogs,
    model.Proposals,
    model.WSLogs,
    model.PassiveLogs

];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => {
    model.init(connection)
});

models.forEach((model) => {
    if(model.associate) { 
        model.associate(connection.models)
    }
});