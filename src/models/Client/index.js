import Sequelize, { Model } from "sequelize";

export default class Clients extends Model {
  static init(sequelize) {
    super.init({
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "The 'cpf' field cannot be null..",
          },
          notEmpty: {
            msg: "The 'cpf' field cannot be empty..",
          },
        },
      },
      main_whats: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      birth_date: {
        type: Sequelize.NOW
      },
      death_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      mother_name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      converted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
      timestamps: true,
      tableName: 'clients',
      schema: 'public'
    });
    
    return this;
  }

  static associate(models) {
    this.hasOne(models.Address, { foreignKey: 'cpf' })
    this.hasMany(models.BankData, { foreignKey: 'cpf' })
    this.hasMany(models.Documents, { foreignKey: 'cpf' })
    this.hasMany(models.Phones, { foreignKey: 'cpf' })
    this.hasMany(models.Consigs, { foreignKey: 'cpf' })
    this.hasMany(models.Cards, { foreignKey: 'cpf' })
    this.hasMany(models.Fgts, { foreignKey: 'cpf' })
    this.hasMany(models.Logs, { foreignKey: 'cpf' })
    this.hasMany(models.Proposals, { foreignKey: 'cpf' })
  }
}