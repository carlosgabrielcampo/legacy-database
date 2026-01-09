module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('clients', {
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      main_whats: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.DATEONLY
      },
      death_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
        type: Sequelize.DATEONLY
      },
      updated_at: {
        type: Sequelize.DATEONLY
      }
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('clients');
  },
};