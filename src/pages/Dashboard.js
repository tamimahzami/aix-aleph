import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Willkommen, {user?.email}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
