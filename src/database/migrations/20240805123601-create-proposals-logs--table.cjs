module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logs', {
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      shop: {
        type: Sequelize.STRING,
      },
      agent: {
        type: Sequelize.STRING,
      },
      channel: {
        type: Sequelize.STRING,
      },
      qualification: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      obs: {
        type: Sequelize.STRING,
      },
      data_log: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      create_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      phone: {
        type: Sequelize.BIGINT,
      },
      campaign_id: {
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.createTable('proposals', {
      bank_code: {
        type: Sequelize.INTEGER,
      },
      released_value: {
        type: Sequelize.DOUBLE,
      },
      commission_value: {
        type: Sequelize.DOUBLE,
      },
      product_type: {
        type: Sequelize.STRING,
      },
      step: {
        type: Sequelize.STRING,
      },
      shop: {
        type: Sequelize.STRING,
      },
      agent: {
        type: Sequelize.STRING,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      cpf: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('logs');
    await queryInterface.dropTable('proposals');
  }
};