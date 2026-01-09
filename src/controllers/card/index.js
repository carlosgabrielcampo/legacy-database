import { Op } from 'sequelize';

import { Client, Consig, Card, Address } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';

class CardController {
  async index(req, res) {
    const cards = await Card.findAll();
    return res.status(200).json(cards);
  }

  async show(req, res) {
    try {
      const { card_identifier } = req.params;
      if (!card_identifier) throw new Error('Missing card_identifier');
      const cards = await Card.findByPk(card_identifier);

      if (!cards) throw new Error('Invalid card');

      return res.status(200).json(cards);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async store(req, res) {
    try {
      const cards = await Card.create(req.body);
      return res.status(201).json(cards);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async put(req, res) {
    try {
      const { card_identifier } = req.params;
      if (!card_identifier) throw new Error('Missing card_identifier');
      const card = await Card.findByPk(card_identifier);
      if (!card) {
        const createdCard = await Card.create(req.body);
        return res.status(201).json(createdCard);
      } else {
        const updatedDatas = await card.update(req.body);
        return res.status(202).json(updatedDatas);
      }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async patch(req, res) {
    try {
      const { card_identifier } = req.params;
      const body = req.body
      if (!card_identifier) throw new Error('Missing card_identifier');
      const card = await Card.findByPk(card_identifier);
      if (!card) throw new Error('Invalid card');
        const updatedDatas = await card.update(body);
        return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async showByBenefit (req, res) {
    try {
      const { benefit_number } = req.params;
      if (!benefit_number) throw new Error('Missing benefit_number');
      const card = await Card.findAll({where: {benefit_number: benefit_number}});

      if (!card) throw new Error('Invalid card');

      return res.status(200).json(card);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async delete(req, res) {
    try {
      const { card_identifier } = req.params;
      if (!card_identifier) throw new Error('Missing card_identifier');
  
      const card = await Card.findByPk(card_identifier);

      if (!card) throw new Error('Invalid card');

      await card.destroy();

      return res.status(200).json('Card deleted successfully.');
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async filter(req, res) {
    try {
      let modelMaps = { "Card": Card, "Consig": Consig, "Client": Client, "Address": Address };
      let validationFields = [
        {
          field: "limit",
          defaultValue: 150000,
          required: true
        },
        {
          field: "offset",
          required: false
        },
        {
          field: "order",
          defaultValue: [["card_identifier", "DESC"]],
          required: true
        },
        {
          field: "attributes",
          required: false
        }
      ]
      let querie = {};
      validationFields.forEach(el => {
        if(req.body.hasOwnProperty(el.field)){
          querie[el.field] = req.body[el.field];
        } else {
          if(el.required) querie[el.field] = el.defaultValue;
        }
      })

      if(req.body.filters?.length > 0) {
        querie.where = {};
        req.body.filters.forEach(el => {
          querie.where[el.attribute] = {
            [Op[el.operation]]: el.value
          }
        });
      }

      if(req.body.include && req.body.include.length > 0) {
        const includesObj = insertIncludes(req.body.include);
        querie.include = includesObj;
      }

      console.time("Find");
      let cards = await Card.findAll(querie);
      console.timeEnd("Find");
      let responseBody = {
        cards: cards
      };

      if(req.body.hasOwnProperty("limit")) {
        responseBody.limit = querie.limit;
        responseBody.offset = querie.offset ? querie.offset + querie.limit : querie.limit;
      }

      return res.status(200).json(responseBody);

      function insertIncludes (includes) {
        let arr = [];
        for(let model of includes) {
          let body = {
            model: modelMaps[model.model],
            attributes: model.attributes
          }
          if(model.filters?.length > 0) {
            body.where = {};
            model.filters.forEach(filter => {
              body.where[filter.attribute] = {
                [Op[filter.operator]]: filter.values
              }
            });
          }
          if(model.include?.length > 0) {
            const nestedIncludes = insertIncludes([...model.include]);
            body.include = nestedIncludes;
          }
          arr.push(body);
        }
        return arr;
      }
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

}

export default new CardController();