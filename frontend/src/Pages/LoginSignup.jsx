import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Effacer les erreurs précédentes
    setSuccess(''); // Effacer les messages de succès précédents

    fetch('http://localhost:5001/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nom,
        Prenom,
        Email,
        Mot_de_passe,
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => { throw new Error(error.message); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setSuccess('Inscription avec succès'); // Afficher le message de succès
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    });
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Nom' value={Nom} onChange={(e) => setNom(e.target.value)} />
            <input type="text" placeholder='Prenom' value={Prenom} onChange={(e) => setPrenom(e.target.value)} />
            <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Mot de passe' value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
          </div>
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">Already have an account? <span onClick={() => window.location.href = '/login'}>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
