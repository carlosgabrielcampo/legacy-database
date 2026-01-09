import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class WeightedTax extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
      },
      ported_tax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'ported_tax' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'ported_tax' field cannot be empty..",
          },
        },
      },
      paid_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'paid_installments' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'paid_installments' field cannot be empty..",
          },
        },
      },
      open_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'open_installments' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'open_installments' field cannot be empty..",
          },
        },
      },
      weighted_tax: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'weighted_tax' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'weighted_tax' field cannot be empty..",
          },
        },
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
      tableName: 'weighted_tax',
      timestamps: true
    });
    return this;
  }

}
