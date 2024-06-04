// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const { Nom, Prenom, Email, Mot_de_passe } = req.body;

  try {
    console.log('Registering user with email:', Email);
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 10); // Utilisation de 10 tours
    const newUser = await User.create({ Nom, Prenom, Email, Mot_de_passe: hashedPassword });
    console.log('User registered:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    const user = await User.findOne({ where: { Email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id_Utilisateur }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
