module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('comercial_reports', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      seller_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      seller_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY
      },
      branch: {
        type: Sequelize.STRING,
        allowNull: false
      },
      conversions_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      simulations_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      entity_count: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      volume_count: {
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
    return queryInterface.dropTable('comercial_reports');
  },
};