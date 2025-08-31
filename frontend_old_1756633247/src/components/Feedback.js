import React, { useEffect, useState } from 'react';
import './Feedback.css'; // optional, sonst App.css

function Feedback({ message, duration = 2000 }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (message) {
      setFade(false);
      const timer = setTimeout(() => setFade(true), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message) return null;

  return (
    <p className={fade ? 'fade-out' : ''}>{message}</p>
  );
}

export default Feedback;
