module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('consigs', {
      benefit_number: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      convenio: {
        type: Sequelize.STRING
      },
      type_benefit: {
        type: Sequelize.STRING
      },
      base_income: {
        type: Sequelize.DOUBLE
      },
      margin: {
        type: Sequelize.DOUBLE
      },
      card_margin: {
        type: Sequelize.DOUBLE
      },
      card_benefit_margin: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },
      politic_status_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      dib: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATEONLY
      },
      updated_at: {
        type: Sequelize.DATEONLY
      }
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('consigs');
  },
};