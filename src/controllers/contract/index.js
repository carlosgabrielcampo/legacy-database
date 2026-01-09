import path from 'path'
import { Op } from 'sequelize';

import { Client, Consig, Contract, Address } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class Services {
  insertIncludes (includes) {
    const clientModels = { Contract, Consig, Client, Address };
    let arr = [];
    for(let modelName of includes){
      let body = {
        model: clientModels[modelName.model],
        attributes: modelName.attributes
      }
      
      if(modelName.filters?.length > 0) {
        body.where = {};
        modelName.filters.forEach(filter => {
          body.where[filter.attribute] = {
            [Op[filter.operator]]: filter.values
          }
        });
      }

      if(modelName.include?.length > 0) {
        const nestedModelsInclusion = this.insertIncludes([...modelName.include]);
        body.include = nestedModelsInclusion;
      }
      arr.push(body);
    }

    return arr;
  }
}


class ContractController {
  async index(req, res) {
    const contracts = await Contract.findAll();
    return res.status(200).json(contracts);
  }

  async show(req, res) {
    try {
      const { contract_identifier } = req.params;
      if (!contract_identifier) throw new Error('Missing contract_identifier');
      const contract = await Contract.findByPk(contract_identifier);

      if (!contract) throw new Error('Invalid contract');

      return res.status(200).json(contract);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async showByBenefit (req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing contract_identifier');
      const contract = await Contract.findAll({where: {benefit_number: benefit_number}});

      if (!contract) throw new Error('Invalid contract');

      return res.status(200).json(contract);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const contract = await Contract.create(req.body);
      return res.status(201).json(contract);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { contract_identifier } = req.params;
      if (!contract_identifier) throw new Error('Missing contract_identifier');
      const contract = await Contract.findByPk(contract_identifier);
      if (!contract) {
        const createdContract = await Contract.create(req.body);
        return res.status(201).json(createdContract);
      } else {
        const updatedDatas = await contract.update(req.body);
        return res.status(202).json(updatedDatas);
      }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async patch(req, res) {
    try {
      const { contract_identifier } = req.params;
      if (!contract_identifier) throw new Error('Missing contract_identifier');
      const contract = await Contract.findByPk(contract_identifier);

      if (!contract) throw new Error('Invalid contract');

        const updatedDatas = await contract.update(req.body);
        return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { contract_identifier } = req.params;
      if (!contract_identifier) throw new Error('Missing contract_identifier');
  
      const contract = await Contract.findByPk(contract_identifier);

      if (!contract) throw new Error('Invalid contract');

      await contract.destroy();

      return res.status(200).json('Contract deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    try {

      const dbbQuery = {
        "order": [["contract_identifier", "DESC"]], 
        "limit": 250000,
        "attributes": req.body?.attributes,
        "offset": req.body?.offset
      };

      if(req.body.filters?.length > 0) {
        dbbQuery.where = {};
        req.body.filters.forEach(el => {
          dbbQuery.where[el.attribute] = { [Op[el.operation]]: el.value }
        });
      }

      if(req.body.include && req.body.include.length > 0) {
        const includesObj = new Services().insertIncludes(req.body.include);
        dbbQuery.include = includesObj;
      }

      console.time("Find");
      const contracts = await Contract.findAll(dbbQuery);
      console.timeEnd("Find");

      const responseBody = { contracts };
      if(req.body.limit) {
        responseBody.limit = dbbQuery.limit;
        responseBody.offset = dbbQuery.offset ? dbbQuery.offset + dbbQuery.limit : dbbQuery.limit;
      }
      console.log({responseBody}, req.body?.attributes)

      return res.status(200).json(responseBody);
    } catch (error) {
      console.error(error);
      return handleResponseError(error, res);
    }
  }

  async importStore(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "contract", filename);

      // Read file and delete after call to create bulks
      fs.readFile(filePath, "utf8", createBulk);
      fs.unlink(filePath, (err) => {
        if (err)  console.error("rror to exclude temporary file:", err);
      });
    } catch (e) {
      return handleResponseError(e, res);
    }

    async function createBulk (err, data){
      if (err) throw new Error("Error to read file, please check JSON structure.");
      res.status(200).send("File received and processed successfully.");

      let bulkArray = JSON.stringify(data);

      let bulkResult = await Contract.bulkCreate(bulkArray)
      .then( response => console.info('Bulk create ', response) )
      .catch( err => console.error('Bulk create ', err) );
      console.info('Bulk create result: ', bulkResult);
    }
  }

  async importUpdate(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "contract", filename);

      // Read file and delete after call to update many
      fs.readFile(filePath, "utf8", updateMany);
      fs.unlink(filePath, (err) => {
        if (err) console.error("rror to exclude temporary file:", err);
      });
    } catch (e) {
      return handleResponseError(e, res);
    }

    async function updateMany (err, data){
      if (err) throw new Error("Error to read file, please check JSON structure.");
      res.status(200).send("File received and processed successfully.");

      let bulkArray = JSON.stringify(data);

      let bulkResult = await Contract.bulkCreate(bulkArray, {
        updateOnDuplicate: ['active', 'tax', 'paid_installments', 'delayed_installments', 'debit_balance', 'politic_status_blocked']
      })
      .then( response => console.info('Bulk update ', response) )
      .catch( err => console.error('Bulk update ', err) );
      console.info('Bulk update result: ', bulkResult);
    }
  }

  async countBank(req, res) {
    try {
      const { code } = req.params;
      if (!code) throw new Error('Missing bank code');
  
      const count = await Contract.count({ 
        where: { 
          bank_code: {
            [Op.eq]: code
          }
        }
      });
      
      return res.status(200).json({bank: code, count});

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async bmgInsert(req, res) {
    try {
      // Verifica se tem todos os campos necessários para criar/atualizar um contrato 
      const { body } = req;
      let requiredFields = ["cpf", "total_installments", "paid_installments", "installment_value", "debit_balance", "tax", "bank_code"];
      let invalidFields = [];
      requiredFields.forEach((el) => {
        if(!body.hasOwnProperty(el)) invalidFields.push(`Required field '${el}' cannot be empty.`);
      });
      if(invalidFields.length > 0) throw new Error(invalidFields);

      // Busca por beneficios do cpf
      const { cpf, bank_code, installment_value, total_installments } = body;
      const consigs = await Consig.findAll({
        where: { cpf: cpf }
      });
      consigs.every(consig => consig instanceof Consig);
      const benefits = JSON.parse(JSON.stringify(consigs, null, 2));

      // Se houver beneficios, cria identificadores para cada matricula e verifica se existe o contrato
      if(benefits.length > 0 ) {
        const identifiers = benefits.map((el) => {
          const installValueFixed = Number.isInteger(installment_value) ? `${installment_value}0` : installment_value.toFixed(2).replace(".", "");
          el.contract_identifier = `${bank_code}${el.benefit_number}${total_installments}${installValueFixed}`;
          return el;
        })

        const contracts = await Contract.findAll({
          where: { contract_identifier: identifiers.map(id => id.contract_identifier) }
        });
        contracts.every(contract => contract instanceof Consig);
        const contractsList = JSON.parse(JSON.stringify(contracts, null, 2));

        // Se não encontrar nenhum contrato, ele cria um novo
        if(contractsList.length === 0) {
          // const contract = await Contract.create(body);
          // return res.status(201).json(contract);
        } 
        // Caso contrário, ele atualiza o primeiro que encontrar da lista
        else {
          const { contract_identifier, benefit_number } = contractsList[0];
          const contract = await Contract.findByPk(contract_identifier);
          if(contract) {
            const updateBody = Object.assign(body, { contract_identifier, benefit_number })
            const updatedDatas = await contract.update(updateBody);
            return res.status(202).json(updatedDatas);
          } else {
            throw new Error(`Error to update contract.`);
          }
        }
      } else { throw new Error('Invalid cpf'); }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async daycovalInsert(req, res) {
    try {
      // Verifica se tem todos os campos necessários para criar/atualizar um contrato 
      const { body } = req;
      let requiredFields = ["cpf", "benefit_number", "paid_installments", "installment_value", "debit_balance", "tax", "bank_code"];
      let invalidFields = [];

      requiredFields.forEach((el) => {
        if(!body.hasOwnProperty(el)) invalidFields.push(`Required field '${el}' cannot be empty.`);
      });
      if(invalidFields.length > 0) throw new Error(invalidFields);

      const { benefit_number, installment_value, bank_code } = body;
      const contractsByBenefit = await Contract.findAll({
        where: { benefit_number, bank_code: 707 }
      });
      contractsByBenefit.every(contract => contract instanceof Consig);
      const contractsList = JSON.parse(JSON.stringify(contractsByBenefit, null, 2));

      let possibleDeadlines = [36, 48, 60, 72, 84, 96];
      let possiblesIds = possibleDeadlines.map((el) => {
        const installValueFixed = Number.isInteger(installment_value) ? `${installment_value}0` : installment_value.toFixed(2).replace(".", "");
        return `${bank_code}${benefit_number}${el}${installValueFixed}`;
      })
      
      const contracts = await Contract.findAll({
        where: { contract_identifier: possiblesIds }
      });

      contracts.every(consig => consig instanceof Consig);
      const contractFormated = JSON.parse(JSON.stringify(contracts, null, 2));

      // Se não encontrar nenhum contrato, ele cria um novo
      if(contractFormated.length === 0) {
        const total_installments = 84;
        const installValueFixed = Number.isInteger(installment_value) ? `${installment_value}0` : installment_value.toFixed(2).replace(".", "");
        const contract_identifier = `${bank_code}${benefit_number}${total_installments}${installValueFixed}`;
        const contract = await Contract.create(Object.assign(body, { total_installments, contract_identifier } ));
        return res.status(201).json(contract);
      }
      // Caso contrário, ele atualiza o primeiro que encontrar da lista
      else {
        const { contract_identifier } = contractFormated[0];
        const contract = await Contract.findByPk(contract_identifier);
        const updatedDatas = await contract.update(body);
        return res.status(202).json(updatedDatas);
      }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }
}

export default new ContractController();