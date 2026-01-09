import Sequelize, { Model } from "sequelize";

export default class Cards extends Model {
  static init(sequelize) {
    super.init({
      card_identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "The 'card_identifier' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'card_identifier' field cannot be empty..",
          },
        },
      },
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
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'cpf' field cannot be null...",
          },
          notEmpty: {
            msg: "The 'cpf' field cannot be empty...",
          },
        },
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      card_type: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      card_contract_number: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      account_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'account_number' field cannot be null...",
          },
          notEmpty: {
            msg: "The 'account_number' field cannot be empty...",
          },
        },
      },
      tax_monthly_rate: {
        type: Sequelize.DOUBLE
      },
      insurance: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      limit: {
        type: Sequelize.DOUBLE
      },
      limit_available: {
        type: Sequelize.DOUBLE
      },
      installment_value: {
        type: Sequelize.DOUBLE
      },
      margin: {
        type: Sequelize.DOUBLE
      },
      max_withdraw_value: {
        type: Sequelize.DOUBLE,
      },
      min_withdraw_value: {
        type: Sequelize.DOUBLE
      },
      margin_aggregation_released: {
        type: Sequelize.DOUBLE
      },
      record_card_date: {
        type: Sequelize.DATE,
        allowNull: true,
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
      tableName: 'cards',
      timestamps: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Consigs, { foreignKey: 'benefit_number' })
  }
}

