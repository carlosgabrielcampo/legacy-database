import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class Logs extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "The 'id' field cannot be null...",
          },
          notEmpty: {
            msg: "The 'id' field cannot be empty...",
          },
        },
      },
      cpf: {
        type: Sequelize.BIGINT,
      },
      shop: {
        type: Sequelize.STRING,
      },
      agent: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      channel: {
        type: Sequelize.STRING,
      },
      qualification: {
        type: Sequelize.STRING,
      },
      qualification_name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      log_id: {
        type: Sequelize.STRING,
      },
      obs: {
        type: Sequelize.STRING,
      },
      log_date: {
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
      }
    },{
      sequelize,
      tableName: 'logs',
      timestamps: true
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Clients, { foreignKey: 'cpf' });
  }
}
