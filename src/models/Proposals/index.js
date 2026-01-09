import Sequelize, { Model } from "sequelize";

export default class Proposals extends Model {
  static init(sequelize) {
    super.init({
      proposal_number: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'proposal_number' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'proposal_number' field cannot be empty..",
          },
        },
      },
      cpf: {
        type: Sequelize.BIGINT,
      },
      bank_code: {
        type: Sequelize.INTEGER,
      },
      released_value: {
        type: Sequelize.DOUBLE,
      },
      commission_value: {
        type: Sequelize.DOUBLE,
      },
      product_type: {
        type: Sequelize.STRING,
      },
      step: {
        type: Sequelize.STRING,
      },
      shop: {
        type: Sequelize.STRING,
      },
      agent: {
        type: Sequelize.STRING,
      },
      convenio: {
        type: Sequelize.STRING,
      },
      step_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    }, {
      sequelize,
      tableName: 'proposals',
      timestamps: true
    });
    return this;
  }
}
