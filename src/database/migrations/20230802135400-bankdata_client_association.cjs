'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('bankdata', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'bankdata_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};
