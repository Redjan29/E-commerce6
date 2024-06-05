// backend/controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');

// Fonction de middleware pour la validation
exports.validateRegister = [
  check('Nom').not().isEmpty().withMessage('Le nom est obligatoire'),
  check('Prenom').not().isEmpty().withMessage('Le prénom est obligatoire'),
  check('Email').isEmail().withMessage('L\'adresse e-mail doit être valide'),
  check('Mot_de_passe')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
    .matches(/\d/)
    .withMessage('Le mot de passe doit contenir un chiffre'),
];

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { Nom, Prenom, Email, Mot_de_passe } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(Mot_de_passe, 8);
    const newUser = await User.create({ Nom, Prenom, Email, Mot_de_passe: hashedPassword });
    console.log('User registered:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(400).json({ message: error.message });
  }
};
