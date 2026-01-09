import Sequelize, { Model, UUIDV4 } from "sequelize";

export default class ComercialReports extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
      },
      seller_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'seller_id' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'seller_id' field cannot be empty..",
          },
        },
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'seller_name' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'seller_name' field cannot be empty..",
          },
        },
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'branch' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'branch' field cannot be empty..",
          },
        },
      },
      date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      conversions_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'conversions_count' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'conversions_count' field cannot be empty..",
          },
        },
      },
      simulations_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'simulations_count' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'simulations_count' field cannot be empty..",
          },
        },
      },
      entity_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'entity_count' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'entity_count' field cannot be empty..",
          },
        },
      },
      volume_count: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'volume_count' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'volume_count' field cannot be empty..",
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
      tableName: 'comercial_reports',
      timestamps: true
    });
    return this;
  }
}