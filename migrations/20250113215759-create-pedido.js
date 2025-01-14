'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedido', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      usuarioid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productoid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'producto',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pedido'); 
  }
};
