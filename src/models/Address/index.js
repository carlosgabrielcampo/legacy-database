import Sequelize, { Model } from "sequelize";

export default class Address extends Model {
  static init(sequelize) {
    super.init({
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'cpf' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'cpf' field cannot be empty..",
          },
        },
      },
      street: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      neighborhood: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      number: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      complement: {
        type: Sequelize.STRING,
      },
      cep: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The 'cep' field cannot be empty..",
          },
          notNull: {
            msg: "The 'cep' field cannot be null..",
          }
        }
      },
      city: {
        type: Sequelize.STRING,
      },
      uf: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      created_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    },
      {
        sequelize,
        tableName: 'address',
      });
    return this;
  }
}