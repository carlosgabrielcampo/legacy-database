'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('proposals', {
      fields: ['cpf'],
      type: 'bigint',
      name: 'proposals_clients_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};