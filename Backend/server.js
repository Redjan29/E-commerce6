// backend/server.js
const express = require('express');
const app = require('./app');


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
