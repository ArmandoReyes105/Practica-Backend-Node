'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('carritoproducto', {
      carritoid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carritos', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productoid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'producto',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER, 
        defaultValue: 1, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DATE
      }
    }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('carritoproducto'); 
  }
};
