// backend/tests/userController.test.js
const request = require('supertest');
const app = require('../app'); // Assurez-vous que ce chemin vers app.js est correct
const chai = require('chai');
const expect = chai.expect;

describe('UserController', function() {
  describe('POST /api/users/register', function() {
    it('registers a new user and returns success message', async function() {
      const userData = {
        Nom: 'John',
        Prenom: 'Doe',
        Email: 'john.doe@example.com',
        Mot_de_passe: 'password1234'
      };
      
      const response = await request(app)
        .post('/api/users/register')
        .send(userData)
        .expect(201);
      
      expect(response.body.message).to.equal('User registered successfully');
      expect(response.body.user).to.include({
        Nom: 'John',
        Prenom: 'Doe',
        Email: 'john.doe@example.com'
      });
    });
  });
});
