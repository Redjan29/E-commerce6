import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Vérifiez si l'utilisateur est authentifié
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // Optionnel: récupérer les données de l'utilisateur
    fetch('http://localhost:5001/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setUserData(data))
    .catch(error => {
      console.error('Error fetching user data:', error);
      window.location.href = '/login';
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData ? (
        <div>
          <p>Welcome, {userData.name}!</p>
          {/* Affichez les données de l'utilisateur ici */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;
