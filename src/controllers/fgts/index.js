import { Fgts, Address, BankData, Phone, Consig } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class FgtsController {
  async index(req, res) {
    try {
      const fgtsList = await Fgts.findAll();
      res.status(200).json(fgtsList);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async show(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');    
      const fgts = await Fgts.findByPk(cpf);
      if (!fgts) throw new Error('Invalid fgts');
      return res.status(200).json(fgts);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }
  async store(req, res) {
    try {
      const fgts = await Fgts.create(req.body);
      return res.status(201).json(fgts);

    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async update(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
      const fgts = await Fgts.findByPk(cpf);
      if (!fgts) throw new Error('Invalid fgts');
      const updatedDatas = await fgts.update(req.body);
      return res.status(202).json(updatedDatas);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async delete(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
      const fgts = await Fgts.findByPk(cpf);
      if (!fgts) throw new Error('Invalid fgts');
      await fgts.destroy();
      return res.status(204).json('Fgts deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async filter(req, res) {
    try {
      let querie = JSON.parse(req.body.filters);
      querie['include'] = [
        { model: Address },
        { model: BankData },
        { model: Document },
        { model: Phone },
        { model: Consig },
      ]
      const clients = await Fgts.findAll(querie);
      res.status(200).json(clients);
    } catch(error){
      return res.status(400).json({ error });
    }
  }
}

export default new FgtsController();