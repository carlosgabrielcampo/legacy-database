import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class Phones extends Model {
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
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'phone' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'phone' field cannot be empty..",
          },
        },
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'ddd' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'ddd' field cannot be empty..",
          },
        },
      },
      ddi: {
        type: Sequelize.INTEGER,
        defaultValue: 55
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'origin' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'origin' field cannot be empty..",
          },
        },
      },
      is_whatsapp: {
        type: Sequelize.BOOLEAN,
      },
      do_not_disturb: {
        type: Sequelize.BOOLEAN,
      },
      owner: {
        type: Sequelize.BOOLEAN,
      },
      useful: {
        type: Sequelize.BOOLEAN,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'phones',
      timestamps: true
    });
    return this;
  }

}
