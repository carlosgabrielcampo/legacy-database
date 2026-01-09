'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('consigs', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'consigs_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};
