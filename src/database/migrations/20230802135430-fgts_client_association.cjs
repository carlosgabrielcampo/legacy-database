'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('fgts', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'fgts_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};
