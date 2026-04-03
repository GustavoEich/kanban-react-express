import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then(res => res.ok ? res.json() : Promise.reject()) 
      .then(data => {
        console.log(data); // The stream is already parsed here
        setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  return user;
};

// Only use this Hook if you need the check to also cause a re-render (e.g. showing user name in page).
// Otherwise, use the function in 'src/utils/auth.js'

export default useAuth