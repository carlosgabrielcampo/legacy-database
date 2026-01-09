import Sequelize, { Model } from "sequelize";

export default class Contracts extends Model {
  static init(sequelize) {
    super.init({
      benefit_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'benefit_number' field cannot be null...",
          },
          notEmpty: {
            msg: "The 'benefit_number' field cannot be empty...",
          },
        },
      },
      contract_identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "The 'contract_identifier' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'contract_identifier' field cannot be empty..",
          },
        },
      },
      contract_number: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.BIGINT,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      paid_installments: {
        type: Sequelize.INTEGER,
      },
      total_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'bank_code' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'bank_code' field cannot be empty..",
          },
        },
      },
      tax: {
        type: Sequelize.DOUBLE,
      },
      installment_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      delayed_installments: {
        type: Sequelize.INTEGER,
      },
      debit_balance: {
        type: Sequelize.DOUBLE,
      },
      released: {
        type: Sequelize.DOUBLE,
      },
      politic_status_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      record_contract_date: {
        type: Sequelize.DATEONLY
      },
      installments_initial_date: {
        type: Sequelize.DATEONLY
      },
      created_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      origin: {
        type: Sequelize.STRING,
      }
    }, {
      sequelize,
      tableName: 'contracts',
      timestamps: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Consigs, { foreignKey: 'benefit_number' })
  }
}