import { Op } from "sequelize";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { handleResponseError } from "../../middlewares/errorHandle.js";
import { Contract, Consig, Client, Card } from "../../models/index.js";

let __dirname = dirname(fileURLToPath(import.meta.url));
class ConsigController {
  async index(req, res) {
    const consigs = await Consig.findAll();
    res.status(200).json(consigs);
  }

  async showByCpf(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error("Missing cpf");

      const consig = await Consig.findAll({where: {cpf: cpf}})

      if (!consig) throw new Error("Invalid consig");

      return res.status(200).json(consig);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async show(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error("Missing benefit_number");

      const consig = await Consig.findByPk(benefit_number)

      if (!consig) throw new Error("Invalid consig");

      return res.status(200).json(consig);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async showFull(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error("Missing benefit_number");

      const consig = await Consig.findOne({
        where: { benefit_number: benefit_number },
        include: [
          { model: Contract },
          { model: Card }
        ]
      });

      if (!consig) throw new Error("Invalid consig");

      return res.status(200).json(consig);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const consig = await Consig.create(req.body);
      return res.status(201).json(consig);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
      const consig = await Consig.findByPk(benefit_number);
      if (!consig) {
        const createdConsig = await Consig.create(req.body);
        return res.status(200).json(createdConsig);
      } else {
        const updatedDatas = await consig.update(req.body);
        return res.status(202).json(updatedDatas);
      }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async patch(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
      const consig = await Consig.findByPk(benefit_number);

      if (!consig) throw new Error('Invalid consig');

        const updatedDatas = await consig.update(req.body);
        return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error("Missing benefit_number");

      const consig = await Consig.findByPk(benefit_number);

      if (!consig) throw new Error("Invalid consig");

      await consig.destroy();

      return res.status(204).json("Consig deleted.");

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
      try {
        const { filters } = req.body;
        let querie = {
          include: [
            { model: Contract },
            { model: Client },
            { model: Card }
          ],
          where: {}
        };
  
        filters.forEach(el => {
          querie.where[el.attribute] = {
            [Op[el.operation]]: el.value
          }
        });
  
        const consigs = await Consig.findAll(querie);
  
        res.status(200).json(consigs);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async importStore(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "consig", filename);

      // Read file and delete after call to create bulks
      fs.readFile(filePath, "utf8", createBulk);
      fs.unlink(filePath, (err) => {
        if (err)  console.error("Error to exclude temporary file:", err);
      });
    } catch (e) {
      return handleResponseError(e, res);
    }

    async function createBulk (err, data){
      if (err) throw new Error("Error to read file, please check JSON structure.");
      res.status(200).send("File received and processed successfully.");

      let bulkArray = JSON.stringify(data);

      let bulkResult = await Consig.bulkCreate(bulkArray)
      .then( response => console.info("Bulk create ", response) )
      .catch( err => console.error("Bulk create ", err) );
      console.info("Bulk create result: ", bulkResult);
    }
  }

  async importUpdate(req, res) {
    try {
      if (!req.file) throw new Error("No files have been uploaded.");

      let { filename } = req.file;
      let filePath = path.join(__dirname, "..", "..", "..", "docs", "import", "consig", filename);
      console.info("filePath", filePath);
      // Read file and delete after call to update many
      fs.readFile(filePath, "utf8", updateMany);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error to exclude temporary file:", err);
      });
    } catch (e) {
      return handleResponseError(e, res);
    }

    async function updateMany (err, data){
      if (err) throw new Error("Error to read file, please check JSON structure.");
      res.status(200).send("File received and processed successfully.");

      let records = JSON.parse(data);
      console.info("Starting massive update");
      for(let record of records) {
        if(record.benefit_number){
          const { benefit_number } = record;
          const body = new Object(record);
          delete body.benefit_number;
          console.info("Updating consig", benefit_number);
          await Consig.update(body, {
            where: {
              benefit_number
            }
          })
        }
      }
      console.info("Finished massive update");
    }
  }
}

export default new ConsigController();