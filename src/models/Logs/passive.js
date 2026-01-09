import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class PassiveLogs extends Model {
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
      shop_passive: {
        type: Sequelize.STRING,
      },
      agent_passive: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      channel_passive: {
        type: Sequelize.STRING,
      },
      qualification_passive: {
        type: Sequelize.STRING,
      },
      qualification_name_passive: {
        type: Sequelize.STRING,
      },
      status_passive: {
        type: Sequelize.STRING,
      },
      log_id_passive: {
        type: Sequelize.STRING,
      },
      obs_passive: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      log_date_passive: {
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
      tableName: 'passive_logs',
      timestamps: true
    });
    return this;
  }
}
