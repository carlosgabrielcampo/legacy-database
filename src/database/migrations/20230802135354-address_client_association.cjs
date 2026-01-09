'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('address', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'address_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};