import { Op } from 'sequelize';

import { handleResponseError } from '../../middlewares/errorHandle.js';
import { Address, BankData, Client, Consig, Document, Fgts, Phone, Card, Contract } from '../../models/index.js';

class ClientController {
  async index(req, res) {
    try {
      const client = await Client.findAll();
      res.status(200).json(client);
    } catch (e) {
      return handleResponseError(e, res);;
    }
  }

  async show(req, res) {
    try {
      const { cpf } = req.params;

      if (!cpf) throw new Error('Missing cpf');
      
      const client = await Client.findByPk(cpf)

      if (!client) throw new Error('Invalid client');

      return res.status(200).json(client);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async showArray(req, res) {
    try {
      const array = req.body;

      if (!array.length) throw new Error('Array is empty');
      
      const client = await Client.findAll({
        where: {cpf: req.body},
        include: [
          {
            model: Consig, attributes: ["benefit_number", "type_benefit"], 
              include: { model: Card, attributes: ["benefit_number", "installment_value", "max_withdraw_value"] }
          },
          {
            model: Address, attributes: ["uf"]
          }
        ]
      })
      if (!client) throw new Error('Invalid client');
      return res.status(200).json(client);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async showFull(req, res) {
    try {
      const { cpf } = req.params;

      if (!cpf) throw new Error('Missing cpf');
      
      const client = await Client.findByPk(cpf, {
          include: [
            { model: Address },
            { model: BankData },
            { model: Document },
            { model: Phone },
            { model: Consig, 
              include: [
                { model: Contract },
                { model: Card }
            ]},
          ]
      })

      if (!client) throw new Error('Invalid client');

      return res.status(200).json(client);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const student = await Client.create(req.body);
      return res.status(201).json(student);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
      const client = await Client.findByPk(cpf);
      if (!client) return res.status(404).json({ message: "Client not founded."});

      const updatedDatas = await client.update(req.body);
      return res.status(202).json(updatedDatas);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
        const { cpf } = req.params;
        if (!cpf) throw new Error('Missing cpf');
    
        const client = await Client.findByPk(cpf);

        if (!client) throw new Error('Invalid client');

      await client.destroy();

      return res.status(204).json('Client deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    try {
      let { filters } = req.body;
      querie['include'] = [
        { model: Address },
        { model: BankData },
        { model: Document },
        { model: Phone },
        { model: Consig }
      ]

      filters.forEach(el => {
        querie.where[el.attribute] = {
          [Op[el.operation]]: el.value
        }
      });

      const clients = await Client.findAll(filters);
      res.status(200).json(clients);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async importStore(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "client", filename);

      // Read file and delete after call to create bulks
      fs.readFile(filePath, "utf8", createBulk);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error to exclude temporary file:", err);
      });
    } catch (e) {
      return handleResponseError(e, res);
    }

    async function createBulk (err, data){
      if (err) throw new Error("Error to read file, please check JSON structure.");
      res.status(200).send("File received and processed successfully.");

      let bulkArray = JSON.stringify(data);

      let bulkResult = await Client.bulkCreate(bulkArray)
      .then( response => console.info('Bulk create ', response) )
      .catch( err => console.error('Bulk create ', err) );
      console.info('Bulk create result: ', bulkResult);
    }
  }

  async importUpdate(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "client", filename);

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

      let bulkResult = await Client.bulkCreate(bulkArray, {
        updateOnDuplicate: ['name', 'main_whats', 'birth_date', 'death_status', 'mother_name', 'email']
      })
      .then( response => console.info('Bulk update ', response) )
      .catch( err => console.error('Bulk update ', err) );
      console.info('Bulk update result: ', bulkResult);
    }
  }

  async search(req, res) {
    try {

      const clients = await Client.findAll({
        where: {
          [Op.or]: {
            converted: true,
          }
        }
      })

      if (!clients) throw new Error('Invalid client');

      return res.status(200).json(clients);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }
}

export default new ClientController();