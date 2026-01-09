'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('cards', {
      fields: ['benefit_number'],
      type: 'foreign key',
      name: 'card_consig_association',
      references: {
        table: 'consigs',
        field: 'benefit_number'
      }
    });
  }
};
