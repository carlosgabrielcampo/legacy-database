import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class BankData extends Model {
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
      account_type: {
        type: Sequelize.STRING,
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
      bank_name: {
        type: Sequelize.STRING,
      },
      account: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'account' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'account' field cannot be empty..",
          },
        },
      },
      account_digit: {
        type: Sequelize.STRING,
      },
      bank_branch: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'bank_branch' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'bank_branch' field cannot be empty..",
          },
        },
      },
      bank_branch_digit: {
        type: Sequelize.INTEGER,
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
      tableName: 'bankdata',
    });
    return this;
  }
}