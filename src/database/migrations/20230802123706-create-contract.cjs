module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('contracts', {
      benefit_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      contract_identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      contract_number: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      cpf: {
        type: Sequelize.BIGINT,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      paid_installments: {
        type: Sequelize.INTEGER,
      },
      total_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tax: {
        type: Sequelize.DOUBLE
      },
      installment_value: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      delayed_installments: {
        type: Sequelize.INTEGER
      },
      released: {
        type: Sequelize.DOUBLE
      },
      debit_balance: {
        type: Sequelize.DOUBLE
      },
      politic_status_blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      record_contract_date: {
        type: Sequelize.DATEONLY
      },
      installments_initial_date: {
        type: Sequelize.DATEONLY
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
    return queryInterface.dropTable('contracts');
  },
};