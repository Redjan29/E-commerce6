// backend/controllers/authController.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  Id_Produit: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Id_CategorieProduit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isNewCollection: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'produit',
});

module.exports = Product;