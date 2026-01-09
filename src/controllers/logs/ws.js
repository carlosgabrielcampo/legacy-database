import { handleResponseError } from '../../middlewares/errorHandle.js';
import { WSLogs } from '../../models/index.js';
import { Op } from 'sequelize';
class WsLogsController {
  async index(req, res) {
    try {
      const logs = await WSLogs.findAll({});
      res.status(200).json(logs);
    } catch(e){
      return handleResponseError(e, res)
    }
  }

  async show(req, res) {
    try {
      const filter = req.body;
      if (!id) throw new Error('missing log id');
      const log = await WSLogs.findAll(...filter);
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
      let logs = await WSLogs.findByPk(id);
      if(!logs){ 
        logs = await WSLogs.create(req.body); 
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
      const logs = await WSLogs.bulkCreate(req.body, {updateOnDuplicate: ['origin']})
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
      let logs = await WSLogs.findByPk(id);
      if(!logs){
        logs = await WSLogs.create(req.body); 
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
      const log = await WSLogs.findByPk(id);
      if (!log) throw new Error('invalid log');
      await log.destroy();
      return res.status(200).json('log deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async phone(req, res) {
    try {
      const { phone } = req.query;
      if (!phone) throw new Error('Missing phone');
      const phones = await WSLogs.findAll({ where: {phone: phone} });
      if (!phones.length) throw new Error('Phone Not Found');
      return res.status(200).json(phones);
    } catch (e) {
      return res.status(400).json(e.message); 
    }
  }
}

export default new WsLogsController();