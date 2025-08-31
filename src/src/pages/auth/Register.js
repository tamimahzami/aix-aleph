import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { register as registerService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerService({ name, email, password });
      login(data.token); // Automatisch einloggen nach Registrierung
      navigate('/dashboard');
    } catch (err) {
      setError('Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.');
    }
  };

  return (
    <div className="register-container">
      <h2>Registrieren</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default Register;

