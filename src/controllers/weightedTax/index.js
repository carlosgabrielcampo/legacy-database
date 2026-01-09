import { WeightedTax } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class WeightedTaxController {
  async index(req, res) {
    try {
      const tax = await WeightedTax.findAll();
      return res.status(200).json(tax);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async show(req, res) {
    try {
      const { ported_tax } = req.params;
      if (!ported_tax) throw new Error('Missing ported_tax');
      
      const weightedTax = await WeightedTax.findAll({ where: { ported_tax } });
      return res.status(200).json(weightedTax);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      let requiredFields = ["ported_tax", "open_installments", "paid_installments", "weighted_tax"];
      let missingFields = [];

      requiredFields.forEach((field) => { if(!req.body.hasOwnProperty(field)) missingFields.push(field); })
      if (missingFields.length > 0) throw new Error('Missing required fields', missingFields);

      const { ported_tax, open_installments, paid_installments } = req.body;
      const findWeightedTax = await WeightedTax.findAll({ where: { ported_tax, open_installments, paid_installments } });

      if (findWeightedTax.length > 0){
        findWeightedTax.forEach((tax) => {
          tax.destroy();
        })
      }

      const newWeightedTax = await WeightedTax.create(req.body);
      return res.status(201).json(newWeightedTax);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing weighted_tax unique id');
  
      const weightedTax = await WeightedTax.findByPk(id);

      if (!weightedTax) throw new Error('Missing weighted_tax');

      const updatedDatas = await weightedTax.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing phone unique id');
  
      const weightedTax = await WeightedTax.findByPk(id);

      if (!weightedTax) throw new Error('Invalid weighted_tax');

      await weightedTax.destroy();

      return res.status(204).json('weighted_tax deleted.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }
}

export default new WeightedTaxController();