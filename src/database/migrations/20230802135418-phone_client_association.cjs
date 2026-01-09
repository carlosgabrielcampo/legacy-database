'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('phones', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'phone_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};
