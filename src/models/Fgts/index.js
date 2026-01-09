import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class Fgts extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: UUIDV4
      },
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique:true,
        validate: {
          notNull: {
            msg: "The 'cpf' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'cpf' field cannot be empty..",
          },
        },
      },
      category: {
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
      tableName: 'fgts',
      timestamps: true
    });
    return this;
  }
}
