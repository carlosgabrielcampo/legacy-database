import { Address } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class AddressController {
  async index(req, res) {
    const adresses = await Address.findAll();
    res.status(200).json(adresses);
  }

  async show(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const address = await Address.findByPk(cpf);

      if (!address) throw new Error('Invalid address');

      return res.status(200).json(address);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const address = await Address.create(req.body);
      return res.status(201).json(address);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const address = await Address.findByPk(cpf);

      if (!address) throw new Error('Invalid address');

      const updatedDatas = await address.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const address = await Address.findByPk(cpf);

      if (!address) throw new Error('Invalid address');

      await address.destroy();

      return res.status(204).json('Address deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    const adresses = await Address.findAll();
    res.status(200).json(adresses);
  }
}

export default new AddressController();