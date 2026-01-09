import { handleResponseError } from '../../middlewares/errorHandle.js';
import { PassiveLogs } from '../../models/index.js';
import { Op } from 'sequelize';
class PassiveLogsController {
  async index(req, res) {
    try {
      console.log("PassiveLogsController")
      const logs = await PassiveLogs.findAll({});
      res.status(200).json(logs);
    } catch(e){
      return handleResponseError(e, res)
    }
  }

  async show(req, res) {
    try {
      const filter = req.body;
      if (!id) throw new Error('missing log id');
      const log = await PassiveLogs.findAll(...filter);
      if (!log) throw new Error('invalid log');
      return res.status(200).json(log);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const { id } = req.body
      if (!id) throw new Error('Missing id');
      let logs = await PassiveLogs.findByPk(id);
      if(!logs){ 
        logs = await PassiveLogs.create(req.body); 
      } else {
        logs = await logs.update(req.body);
      }
      return res.status(200).json(logs);
    } catch (e) {
      console.log("store passive", {e})
      return handleResponseError(e, res)
    }
  }

    async storeMultiple(req, res) {
    try {
        const logs = await PassiveLogs.bulkCreate(req.body, {updateOnDuplicate: ['origin', 'status_passive', 'qualification_passive', 'obs_passive']})
        if(logs) return res.status(200).json(logs);
        else return res.status(400).json(logs);
      } catch (e) {
        return handleResponseError(e, res)
      }
    }

  async update(req, res) {
    try {
      const { id } = req.params
      if (!id) throw new Error('Missing id');
      let logs = await PassiveLogs.findByPk(id);
      if(!logs){
        logs = await PassiveLogs.create(req.body); 
      } else {
        logs = await logs.update(req.body);
      }
      return res.status(202).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing log id');
      const log = await PassiveLogs.findByPk(id);
      if (!log) throw new Error('invalid log');
      await log.destroy();
      return res.status(200).json('log deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }
}

export default new PassiveLogsController();