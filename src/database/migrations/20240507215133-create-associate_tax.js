'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('associate_tax', {
      benefit_number: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name_rubric: {
        type: Sequelize.STRING,
      },
      rubric: {
        type: Sequelize.STRING,
      },
      contribution_amount: {
        type: Sequelize.DOUBLE,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('associate_tax');
  }
};
