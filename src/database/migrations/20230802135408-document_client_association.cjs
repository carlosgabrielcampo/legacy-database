'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('documents', {
      fields: ['cpf'],
      type: 'foreign key',
      name: 'document_client_association',
      references: {
        table: 'clients',
        field: 'cpf'
      }
    });
  }
};
