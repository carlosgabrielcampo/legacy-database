import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class WSLogs extends Model {
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
      shop_ws: {
        type: Sequelize.STRING,
      },
      agent_ws: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      channel_ws: {
        type: Sequelize.STRING,
      },
      qualification_ws: {
        type: Sequelize.STRING,
      },
      qualification_name_ws: {
        type: Sequelize.STRING,
      },
      status_ws: {
        type: Sequelize.STRING,
      },
      log_id_ws: {
        type: Sequelize.STRING,
      },
      obs_ws: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      log_date_ws: {
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
      tableName: 'ws_logs',
      timestamps: true
    });
    return this;
  }
}
