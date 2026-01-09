module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('phones', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true
      },
      cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      phone: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      ddd: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ddi: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_whatsapp: {
        type: Sequelize.BOOLEAN
      },
      do_not_disturb: {
        type: Sequelize.BOOLEAN
      },
      owner: {
        type: Sequelize.BOOLEAN
      },
      useful: {
        type: Sequelize.BOOLEAN
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATEONLY
      },
      updated_at: {
        type: Sequelize.DATEONLY
      }
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('phones');
  },
};