//frontend/src/Pages/Login
import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Effacer les erreurs précédentes
    setSuccess(''); // Effacer les messages de succès précédents

    console.log('Attempting login with:', { Email, Mot_de_passe });

    fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      setSuccess('Login successful'); // Set success message
      window.location.href = '/Dashboard'; // Replace '/dashboard' with your protected route
    })
    .catch((error) => {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    });
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='Mot de passe' value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="loginsignup-login">Don't have an account? <span onClick={() => window.location.href = '/LoginSignup'}>Sign up here</span></p>
      </div>
    </div>
  );
}

export default Login;
