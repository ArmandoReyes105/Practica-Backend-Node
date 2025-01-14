'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class carrito extends Model {
    static associate(models) {
      carrito.belongsTo(models.usuario, { as: 'usuario', foreignKey: 'usuarioid' });
      carrito.belongsToMany(models.producto, { as: 'productos', through: 'carritoproducto', foreignKey: 'carritoid' });
    }
  }

  carrito.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuarioid: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'carritos',
  });
  return carrito;
};

