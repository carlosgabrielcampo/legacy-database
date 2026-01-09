import { handleResponseError } from '../../middlewares/errorHandle.js';
import { Logs, Client, Consig, Proposals, Card, Address } from '../../models/index.js';
import { Op } from 'sequelize';
class LogsController {
  async index(req, res) {
    try {
      const logs = await Logs.findAll();
      res.status(200).json(logs);
    } catch(e){
      return handleResponseError(e, res)
    }
  }

  async show(req, res) {
    try {
      const { channel, log_date, limit, offset } = req.body;
      if (!req.body) throw new Error('invalid req.body');
      const log = await Logs.findAll({ where: { channel, log_date: { [Op.gte]: log_date } }, limit, offset});
      return res.status(200).json(log);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const { id } = req.body
      if (!id) throw new Error('Missing id');
      let logs = await Logs.findByPk(id);
      if(!logs){ 
        logs = await Logs.create(req.body); 
      } else {
        logs = await logs.update(req.body);
      }
      return res.status(200).json(logs);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      if (!id) throw new Error('Missing id');
      let logs = await Logs.findByPk(id);
      if(!logs){
        logs = await Logs.create(req.body); 
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
      const log = await Logs.findByPk(id);
      if (!log) throw new Error('invalid log');
      await log.destroy();
      return res.status(200).json('log deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async PassiveChannelsDataExtract(req, res) {
    try {
      const LogData = await Logs.findAll({
        where: {[Op.or]: [{ channel: 'CRM'}, {channel: 'WhatsApp 3C' }] },
        include: [{ model: Client, attributes: ["name", "cpf", "birth_date"],
          include: [
            {
              model: Consig, attributes: ["benefit_number", "type_benefit"], 
                include: { model: Card, attributes: ["benefit_number", "installment_value", "max_withdraw_value"] }
            },
            { model: Address, attributes: ["uf"] }
          ]}]
      })
      return res.status(200).json(LogData);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }

  async ActiveChannelsDataExtract(req, res) {
    try {
      let { page, limit, channel } = req.query
      let offset = page * limit
      const count = await Logs.count({where: {channel: channel}})
      if(offset*1 > count*1) return res.status(200).json([])
      if((offset*1 + limit*1) > count*1 ) limit = count*1 - offset*1

      const LogData = await Logs.findAll({
        offset,
        limit: limit,
        where: {channel: channel},
        include: [{ model: Client, attributes: ["name", "cpf", "birth_date"],
          include: [
            {
              model: Consig, attributes: ["benefit_number", "type_benefit"], 
                include: { model: Card, attributes: ["benefit_number", "installment_value", "max_withdraw_value"] }
            },
            { 
              model: Address, attributes: ["uf"] 
            }
          ]}]
      })
      return res.status(200).json(LogData);
    } catch (error) {
      console.error(error)
      return res.status(500).json({error: error.message});
    }
  }

  async phone(req, res) {
    try {
      const { phone } = req.query;
      if (!phone) throw new Error('Missing phone');
      const phones = await Logs.findAll({ where: {phone: phone} });
      if (!phones.length) throw new Error('Phone Not Found');
      return res.status(200).json(phones);
    } catch (e) {
      return res.status(400).json(e.message); 
    }
  }
}

export default new LogsController();