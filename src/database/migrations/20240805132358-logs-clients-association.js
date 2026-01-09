'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('logs', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'logs_clients_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};