const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Configurer Express pour servir des fichiers statiques
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/images', express.static(path.join(__dirname, 'public/css')));

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => console.log(err));

module.exports = app;
