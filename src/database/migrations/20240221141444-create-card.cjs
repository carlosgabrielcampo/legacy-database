module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('cards', {
      card_identifier: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      bank_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      card_type: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      card_contract_number: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      benefit_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      account_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      tax_monthly_rate: {
        type: Sequelize.DOUBLE
      },
      insurance: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      limit: {
        type: Sequelize.DOUBLE
      },
      limit_available: {
        type: Sequelize.DOUBLE
      },
      installment_value: {
        type: Sequelize.DOUBLE
      },
      margin: {
        type: Sequelize.DOUBLE
      },
      max_withdraw_value: {
        type: Sequelize.DOUBLE
      },
      min_withdraw_value: {
        type: Sequelize.DOUBLE
      },
      margin_aggregation_released: {
        type: Sequelize.DOUBLE
      },
      created_at: {
        type: Sequelize.DATEONLY
      },
      updated_at: {
        type: Sequelize.DATEONLY
      },
      record_card_date: {
        allowNull: true,
        type: Sequelize.DATE 
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('cards');
  },
};