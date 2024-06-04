// backend/controllers/authController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { Email, Mot_de_passe } = req.body;

  try {
    console.log('Login attempt with email:', Email);

    const user = await User.findOne({ where: { Email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);

    
    // console.log('Stored hashed password:', user.Mot_de_passe);
    // console.log('Provided password:', Mot_de_passe);

    // const isMatch = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);
    // console.log('Password match status:', isMatch);
    // if (!isMatch) {
    //   console.log('Invalid credentials');
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    const token = jwt.sign({ id: user.id_Utilisateur }, 'your_jwt_secret', { expiresIn: '1h' });
    console.log('Login successful, token generated');
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: error.message });
  }
};
