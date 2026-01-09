module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('address', {
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      neighborhood: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      number: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      complement: {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
      },
      uf: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('address');
  },
};