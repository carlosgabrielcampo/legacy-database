import { AssociateTax } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class AssociateTaxController {
  async index(req, res) {
    const adresses = await AssociateTax.findAll();
    res.status(200).json(adresses);
  }

  async show(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
  
      const associateTax = await AssociateTax.findOne({where: {benefit_number: benefit_number}});

      if (!associateTax) throw new Error('Invalid Associate Tax');

      return res.status(200).json(associateTax);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const associateTax = await AssociateTax.create(req.body);
      return res.status(201).json(associateTax);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
  
      const associateTax = await AssociateTax.findByPk(benefit_number);

      if (!associateTax) throw new Error('Invalid AssociateTax');

      const updatedDatas = await associateTax.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
  
      const associateTax = await AssociateTax.findByPk(benefit_number);

      if (!associateTax) throw new Error('Invalid AssociateTax');

      await associateTax.destroy();

      return res.status(204).json('AssociateTax deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    const adresses = await AssociateTax.findAll();
    res.status(200).json(adresses);
  }
}

export default new AssociateTaxController();