import { ComercialReports } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class ComercialReportsController {
  async index(req, res) {
    const reports = await ComercialReports.findAll();
    res.status(200).json(reports);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing report unique id');
      
      const report = await ComercialReports.findAll({ where: { id } });
      return res.status(200).json(report);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }


  async store(req, res) {
    try {
      let requiredFields = ["seller_id", "date","seller_name", "branch", "conversions_count", "simulations_count", "entity_count", "volume_count"];
      let missingFields = [];

      requiredFields.forEach((field) => { if(!req.body.hasOwnProperty(field)) missingFields.push(field); })
      if (missingFields.length > 0) throw new Error('Missing required fields', missingFields);

      const { seller_id, date } = req.body;
      const findReports = await ComercialReports.findAll({ where: { seller_id, date } });

      if (findReports.length > 0){
        findReports.forEach((tax) => {
          tax.destroy();
        })
      }

      const newReport = await ComercialReports.create(req.body);
      return res.status(201).json(newReport);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing comercial report unique id');
  
      const report = await ComercialReports.findByPk(id);

      if (!report) throw new Error('Invalid comercial report');

      const updatedDatas = await report.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing comercial report unique id');
  
      const report = await ComercialReports.findByPk(id);

      if (!report) throw new Error('Invalid comercial report');

      await report.destroy();

      return res.status(204).json('comercial report deleted.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async sellerReports(req, res) {
    try {
      const { seller_id } = req.params;
      if (!seller_id) throw new Error('Missing seller_id id');
      
      const reports = await ComercialReports.findAll({ where: { seller_id } });
      return res.status(200).json(reports);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    try {
      const { filters } = req.body;
      let querie = {
        order: [["seller_name", "ASC"]],
        where: {}
      };

      filters.forEach(el => {
        querie.where[el.attribute] = {
          [Op[el.operation]]: el.value
        }
      });

      let contracts = await ComercialReports.findAll(querie);
      res.status(200).json(contracts);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }
}

export default new ComercialReportsController();