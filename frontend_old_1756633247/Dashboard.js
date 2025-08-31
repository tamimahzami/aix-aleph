import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // <-- Korrekt relativ zu src/pages

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? <p>Willkommen, {user.email}</p> : <p>Kein Benutzer angemeldet.</p>}
    </div>
  );
};

export default Dashboard;

