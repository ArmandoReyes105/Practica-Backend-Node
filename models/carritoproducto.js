'use strict';

module.exports = (sequelize, DataTypes) => {
    const carritoproducto = sequelize.define('carritoproducto', {
        carritoid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:'carritos',
                key: 'id'
            }
        },
        productoid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'producto',
                key: 'id'
            }
        },
        cantidad: {
            type: DataTypes.INTEGER,
            defaultValue: 1, 
            allowNull: false
        }
    }, {
        freezeTableName: true,
    });

    return carritoproducto; 
}