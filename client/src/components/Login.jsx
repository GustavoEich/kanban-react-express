
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();      // this avoids a browser-level reload of the page and keeps React under control.
    const response = await fetch('/auth/login', {
      method: 'POST',
      body: new URLSearchParams(new FormData(e.target)),
      credentials: 'include' 
    });

    if (response.ok) {
      navigate('/board'); // React Router handles the transition instantly
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section>
          <label htmlFor="username">Username </label>
          <input id="username" name="username" type="text" autoComplete="username" required autoFocus />
        </section>
        <section>
          <label htmlFor="current-password">Password </label>
          <input id="current-password" name="password" type="password" autoComplete="current-password" required />
        </section>
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}

export default Login;