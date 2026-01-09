'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('associate_tax', {
      fields: ['benefit_number'],
      type: 'foreign key',
      name: 'associate_tax_association',
      references: {
        table: 'consigs',
        field: 'benefit_number'
      }
    });
  }
};
