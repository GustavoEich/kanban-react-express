const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/'; // Redirects with hard-reload, cleans memory; better than 'useNavigate'.
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <>
      <p>
        <button onClick={handleLogout}>Logout</button>
      </p>
    </>
  )
};

export default LogoutButton;