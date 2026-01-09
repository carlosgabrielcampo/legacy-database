import { handleResponseError } from '../../middlewares/errorHandle.js';
import { Proposals } from '../../models/index.js';

class ProposalsController {
  async index(req, res) {
    try{
      const proposal = await Proposals.findAll();
      res.status(200).json(proposal);
    } catch(e){
      return handleResponseError(e, res)
    }
  }

  async show(req, res) {
    try {
      const { cpf } = req.params;
      if (!cpf) throw new Error('missing proposal cpf');
      const proposal = await Proposals.findAll({cpf: cpf});
      if (!proposal) throw new Error('invalid proposal');
      return res.status(200).json(proposal);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const { proposal_number } = req.body
      let proposal = await Proposals.findByPk(proposal_number);
      if(proposal_number){
        if(!proposal){ 
          proposal = await Proposals.create(req.body); 
        } else {
          req.params = {proposal_number}
          return await new ProposalsController().update(req, res)
        }
      }
      return res.status(200).json(proposal);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async update(req, res) {
    try {
        const { proposal_number } = req.params;
        if (!proposal_number) throw new Error('Missing proposal_number');
        const proposal = await Proposals.findByPk(proposal_number);
        let updatedDatas
        if (!proposal) {
           return await new ProposalsController().store(req, res)
        } else { 
          updatedDatas = await proposal.update(req.body);
        }
        return res.status(202).json(updatedDatas);
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async delete(req, res) {
    try {
      const { proposal_number } = req.params;
      if (!proposal_number) throw new Error('Missing proposal cpf');
      const proposal = await Proposals.findByPk(proposal_number);
      if (!proposal) throw new Error('invalid proposal');
      await proposal.destroy();
      return res.status(200).json('proposal deleted.');
    } catch (e) {
      return handleResponseError(e, res)
    }
  }

  async filter(req, res) {
    try {
      const proposals = await Proposals.findAll();
      res.status(200).json(proposals);
    } catch (error) {
      return handleResponseError(error, res)
    }
  }
}

export default new ProposalsController();