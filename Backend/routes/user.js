// backend/routes/user.js
const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Importez le middleware d'authentification
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route protégée
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is the user profile', user: req.user });
});

module.exports = router;

