import Sequelize, { Model } from "sequelize";

export default class AssociateTax extends Model {
  static init(sequelize) {
    super.init({
      benefit_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The 'benefit_number' field cannot be null...",
          },
          notEmpty: {
            msg: "The 'benefit_number' field cannot be empty...",
          },
        },
      },
      name_rubric: {
        type: Sequelize.STRING,
      },
      rubric: {
        type: Sequelize.STRING,
      },
      contribution_amount: {
        type: Sequelize.DOUBLE,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    },{
      sequelize,
      tableName: 'associate_tax',
      timestamps: true
    });
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Consigs, { foreignKey: 'benefit_number' })
  }
}