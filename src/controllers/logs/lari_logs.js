import path from "path";
import { handleResponseError } from "../../middlewares/errorHandle.js";
import LariLogs from "../../models/Logs/lari_logs.js";
import fs from 'fs'

class LariLogsController {
  async findMultiple(req, res) {
    try {
      if (!req.body) throw new Error('Missing IDs');
      let logs = await LariLogs.findAll({
        where: {
          id: req.body
        }
      });
      if(logs){
        return res.status(200).json(logs);
      } else {
        return res.status(404).json(logs);
      }
    } catch (error) {
      return res.status(500).json(logs);
    }
  }
  async update(req, res) {
    try {
      console.log("update")
      const logs = await LariLogs.update(req.body, {where: {id: req.body.id}});
      if(logs) return res.status(200).json(logs);
      else return res.status(400).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async multipleupdate(req, res) {
    try {
      console.log('multiple')
      const logs = await Promise.all(req.body.map((e) => LariLogs.update(e, {where: {id: e.id},  })))
      if(logs) return res.status(200).json(logs);
      else return res.status(400).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async create(req, res) {
    try {
      console.log("create")
      const logs = await LariLogs.create(req.body);
      if(logs) return res.status(200).json(logs);
      else return res.status(400).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async createMultiple (req, res) {
    try {
      const logs = await LariLogs.bulkCreate(req.body, {updateOnDuplicate: ["bmg_valor_parcela_1", "bmg_valor_maximo_saque_1", "bmg_valor_parcela_2", "bmg_valor_maximo_saque_2", "bmg_valor_parcela_3", "bmg_valor_maximo_saque_3", "bmg_valor_parcela_4", "bmg_valor_maximo_saque_4", "bmg_total_parcela", "bmg_total_valor_maximo_saque" ] })
      if(logs) return res.status(200).json(logs);
      else return res.status(400).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async importFile(req, res) {
    try {
        if (!req.file) throw new Error("No files have been uploaded.");
        let { filename } = req.file;
        let filePath = path.join("./docs/import/logs", filename);
        // Read file and delete after call to update many
        const fileText = JSON.parse(fs.readFileSync(filePath, "utf8"));
        for (let index = 0; index < fileText.length; index++) {
            const id = fileText[index].id
            let logs = await LariLogs.findByPk(id);
            const object = {...fileText[index]}
            Object.entries(object).map(([key, value]) => {if(!value) delete object[key]})
            if(!logs) logs = await LariLogs.create(object);
            else logs = await logs.update((object));
        }
        return res.status(200).json({response: 'success'});
    } catch (error) {
        console.log(error)
        return res.status(500).json({response: 'error'});
    }
  }

    async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing log id');
      const log = await LariLogs.findByPk(id);
      if (!log) throw new Error('invalid log');
      await log.destroy();
      return res.status(200).json('log deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }
}

export default new LariLogsController();