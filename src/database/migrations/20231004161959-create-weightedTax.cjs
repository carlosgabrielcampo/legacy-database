module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('weighted_tax', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      ported_tax: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      paid_installments: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      open_installments: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      weighted_tax: {
        type: Sequelize.DOUBLE,
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
    return queryInterface.dropTable('weighted_tax');
  },
};