module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('fgts', {
      id: {
        type: Sequelize.UUID,
        unique: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('fgts');
  },
};