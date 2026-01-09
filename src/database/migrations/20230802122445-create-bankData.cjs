module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bankdata', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      account_type: {
        type: Sequelize.STRING
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bank_name: {
        type: Sequelize.STRING
      },
      account: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      account_digit: {
        type: Sequelize.STRING
      },
      bank_branch: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bank_branch_digit: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('bankdata');
  },
};