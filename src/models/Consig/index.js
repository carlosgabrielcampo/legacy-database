import Sequelize, { Model } from "sequelize";

export default class Consigs extends Model {
  static init(sequelize) {
    super.init({
      benefit_number: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true,
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
            msg: "The 'cpf' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'cpf' field cannot be empty..",
          },
        }
      },
      convenio: {
        type: Sequelize.STRING,
      },
      orgao: {
        type: Sequelize.STRING,
      },
      type_benefit: {
        type: Sequelize.STRING,
      },
      base_income: {
        type: Sequelize.DOUBLE,
      },
      margin: {
        type: Sequelize.DOUBLE,
      },
      card_margin: {
        type: Sequelize.DOUBLE,
      },
      card_benefit_margin: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      politic_status_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },      
      dib: {
        type: Sequelize.DATEONLY,
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
      tableName: 'consigs',
      timestamps: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Clients, { foreignKey: 'cpf' });
    this.hasMany(models.Contracts, { foreignKey: 'benefit_number' });
    this.hasMany(models.Cards, { foreignKey: 'benefit_number' });
    this.hasOne(models.AssociateTax, { foreignKey: 'benefit_number' });
  }
}
