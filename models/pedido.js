'use strict'; 

const { Model } = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
    class Pedido extends Model {
        static associate(models) {
            Pedido.belongsTo(models.usuario, { as: 'usuario', foreignKey: 'usuarioid'});
            Pedido.belongsTo(models.producto, { as: 'producto', foreignKey: 'productoid' }); 
        }
    }

    Pedido.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        usuarioid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        productoid: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        precio: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        subtotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        fecha: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false
        }
      }, {
        sequelize,
        modelName: 'pedido',
        freezeTableName: true
      });

    return Pedido; 
}; 
