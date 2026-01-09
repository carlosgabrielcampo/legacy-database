import { BankData } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class BankDataController {
  async index(req, res) {
    const bankDatas = await BankData.findAll();
    res.status(200).json(bankDatas);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing cpf');
      const bankData = await BankData.findOne({where: {cpf: id}});
      
      if (!bankData) throw new Error('Invalid bank data');

      return res.status(200).json(bankData);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const bankData = await BankData.create(req.body);
      return res.status(201).json(bankData);

    } catch (err) {
      return handleResponseError(err, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing cpf');
  
      const bankData = await BankData.findOne({where: {cpf: id}});

      if (!bankData) throw new Error('Invalid bank data');

      const updatedDatas = await bankData.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const bankData = await BankData.findByPk(cpf);

      if (!bankData) throw new Error('Invalid bank data');

      await bankData.destroy();

      return res.status(204).json('Bank data deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    const bankDatas = await BankData.findAll();
    res.status(200).json(bankDatas);
  }
}

export default new BankDataController();