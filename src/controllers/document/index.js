import { Document } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class DocumentController {
  async index(req, res) {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  }

  async show(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const document = await Document.findAll({ where: { cpf: cpf }});

      if (!document) throw new Error('Invalid document');

      return res.status(200).json(document);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const document = await Document.create(req.body);
      return res.status(201).json(document);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async update(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const document = await Document.findByPk(cpf);

      if (!document) throw new Error('Invalid document');

        const updatedDatas = await document.update(req.body);
        return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('Missing cpf');
  
      const document = await Document.findByPk(cpf);

      if (!document) throw new Error('Invalid document');

      await document.destroy();

      return res.status(204).json('Document deleted successfully.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  }
}

export default new DocumentController();