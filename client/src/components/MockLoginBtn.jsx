function MockLoginBtn({handleLogin}) {

  return (
    <button onClick={handleLogin}>
      Mock Login (Toggle isLogged)
    </button>
  );
}

export default MockLoginBtn