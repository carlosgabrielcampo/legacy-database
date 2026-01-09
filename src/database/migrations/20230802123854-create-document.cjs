module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('documents', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emission_date: {
        type: Sequelize.DATEONLY
      },
      issuing_agency: {
        type: Sequelize.STRING
      },
      serial_number: {
        type: Sequelize.STRING
      },
      uf: {
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
    return queryInterface.dropTable('documents');
  },
};