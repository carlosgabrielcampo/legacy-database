import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class Documents extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
      },
      cpf: {
        type: Sequelize.BIGINT,
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
      type: {
        type: Sequelize.STRING,
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
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'number' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'number' field cannot be empty..",
          },
        },
      },
      emission_date: {
        type: Sequelize.NOW,
      },
      issuing_agency: {
        type: Sequelize.STRING,
      },
      serial_number: {
        type: Sequelize.STRING,
      },
      uf: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize,
      tableName: 'documents',
      timestamps: true
    });
    return this;
  }
}
