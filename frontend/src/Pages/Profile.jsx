// frontend/src/Pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5001/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="profile">
      <h1>Votre Profil</h1>
      <p>Nom: {user.Nom}</p>
      <p>Prénom: {user.Prenom}</p>
      <p>Email: {user.Email}</p>
      {/* Ajoutez d'autres informations ici */}
    </div>
  );
}

export default Profile;
