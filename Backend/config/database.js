// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e-commerce5', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Afficher les requêtes SQL exécutées
});

module.exports = sequelize;
