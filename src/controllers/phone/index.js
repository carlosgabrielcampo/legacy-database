import { Phone } from '../../models/index.js';
import { handleResponseError } from '../../middlewares/errorHandle.js';
import PhoneDbFixed from "../../middlewares/phoneDbFixed.js"
import { Op, or } from 'sequelize';

class PhoneController {
  async index(req, res) {
    const phones = await Phone.findAll();
    res.status(200).json(phones);
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing cpf');
      const phone = await Phone.findAll({ where: {cpf: id} });
      if (!phone) throw new Error('Missing phone');
      return res.status(200).json(phone);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }

  async phone(req, res) {
    try {      
      const { ddd, phone } = req.query;
      if (!ddd) throw new Error('Missing ddd');
      const phones = await Phone.findAll({ where: {ddd: ddd, phone: phone} });
      if (!phones.length) throw new Error('Phone Not Found');
      return res.status(200).json(phones);
    } catch (e) {
      return res.status(400).json(e.message); 
    }
  }

  async showMultiple(req, res) {
    try {
      const phoneArray = req.body;
      if (!phoneArray.length) throw new Error('Missing cpf');
      const phone = await PhoneDbFixed.findAll(phoneArray);
      if (!phone) throw new Error('Missing phones');
      return res.status(200).json(phone);
    } catch (e) {
      return handleResponseError(e, res);
    }
  }
  async store(req, res) {
    try {
      let requiredFields = [ "cpf", "origin", "ddi", "ddd", "phone"];
      let missingFields = [];

      requiredFields.forEach((field) => { if(!req.body.hasOwnProperty(field)) missingFields.push(field); })
      if (missingFields.length > 0) throw new Error('Missing required fields', missingFields);

      const { ddd, phone, cpf, origin } = req.body;
      const findPhone = await Phone.findOne({ where: { cpf, ddd, phone, origin}});
      if (!findPhone){
        const newPhone = await Phone.create(req.body);
        res.status(201).json(newPhone);
      } else {
        res.status(400).json({error: "Duplicated Phone"});
      }
    } catch (e) {
      handleResponseError(e, res);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing phone unique id');
  
      const phone = await Phone.findByPk(id);

      if (!phone) throw new Error('Missing phone');

      const updatedDatas = await phone.update(req.body);
      return res.status(202).json(updatedDatas);

    } catch (e) {
      return handleResponseError(e, res);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('Missing phone unique id');
  
      const phone = await Phone.findByPk(id);

      if (!phone) throw new Error('Invalid phone');

      await phone.destroy();

      return res.status(204).json('Phone deleted.');

    } catch (e) {
      return handleResponseError(e, res);
    }
  }
  async filter(req, res) {
    try {
      const { filters, attributes } = req.body;
      if(!filters) return res.status(400).json({ message: `Filters cannot be empty.` });
  
      let querie = {
        attributes,
        where: {}
      };
  
      filters.forEach(el => {
        querie.where[el.attribute] = {
          [Op[el.operation]]: el.value
        }
      });
  
      let phones = await Phone.findAll(querie);  
      return res.status(200).json(phones);
    } catch(error) {
      return res.status(503).json({ message: `Error to find phones.`, error });
    }
  }

  async phoneScore(req, res) {
    try {
      const { positiveCalls, negativeCalls } = req.body;

      if (!positiveCalls || !negativeCalls) throw new Error('Missing Calls');

      const scoreObj = {
        positive: 100,
        negative: {
          "38141": -26,
          "38143": -10
        }
      }

      const now = new Date().toISOString().slice(0, 10);

      const updatedPhones = await Phone.findAll({ where: { updated_at: now } })
        .then((res) => {
          let arr = [];
          res.forEach((phone) => {
            arr.push(phone.cpf + phone.ddd + phone.phone);
          });

          return arr;
        });

      for(let [qualification, calls] of Object.entries(positiveCalls)) {

        if(Object.keys(calls).length == 0) continue;

        for(const [key, value] of Object.entries(calls)) {
          const ddd = key.slice(2, 4)
          const phone = key.slice(4)
          const cpf = value

          if(!cpf || !ddd || !phone || updatedPhones.includes(`${cpf}${ddd}${phone}`)) continue;

          const lastScore = await Phone.findOne({ where: { cpf, ddd, phone } });

          if(!lastScore) {
            await Phone.create({ cpf, ddi: 55, ddd, phone, score: scoreObj.positive, origin: "Discadora" })
              .then(() => {
                console.log(`Phone created for ${cpf} - ${ddd} - ${phone}`)
              })
              .catch((e) => {
                console.log(`Error to create phone for ${cpf} - ${ddd} - ${phone}`)
                console.log(e)
              });
          } else {
            let newScore = lastScore.score + scoreObj.positive;
            if(newScore > 100) newScore = 100;
            await Phone.update({ score: newScore }, { where: { cpf, ddd, phone } })
              .then(() => {
                console.log(`Score updated for ${cpf} - ${ddd} - ${phone}`)
              })
              .catch((e) => {
                console.log(`Error to update score for ${cpf} - ${ddd} - ${phone}`)
                console.log(e)
              });
          }

        }
      }

      for(let [qualification, calls] of Object.entries(negativeCalls)) {

        if(Object.keys(calls).length == 0) continue;

        for(const [key, value] of Object.entries(calls)) {
          const ddd = key.slice(2, 4)
          const phone = key.slice(4)
          const cpf = value

          if(!cpf || !ddd || !phone || updatedPhones.includes(`${cpf}${ddd}${phone}`)) continue;

          const lastScore = await Phone.findOne({ where: { cpf, ddd, phone } });

          if(!lastScore) {
            await Phone.create({ cpf, ddi: 55, ddd, phone, score: scoreObj.negative[qualification], origin: "Discadora" })
              .then(() => {
                console.log(`Phone created for ${cpf} - ${ddd} - ${phone}`)
              })
              .catch((e) => {
                console.log(`Error to create phone for ${cpf} - ${ddd} - ${phone}`)
                console.log(e)
              });
          } else {
            let newScore = lastScore.score + scoreObj.negative[qualification];
            await Phone.update({ score: newScore }, { where: { cpf, ddd, phone } })
              .then(() => {
                console.log(`Score updated for ${cpf} - ${ddd} - ${phone}`)
              })
              .catch((e) => {
                console.log(`Error to update score for ${cpf} - ${ddd} - ${phone}`)
                console.log(e)
              });
          }
        }
      }

      return res.status(200).json({ message: "Scores updated" });
    } catch (e) {
      return handleResponseError(e, res);
    }
  }
}

export default new PhoneController();