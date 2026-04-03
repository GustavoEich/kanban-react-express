
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();      // this avoids a browser-level reload of the page and keeps React under control.
    const response = await fetch('/auth/signup', {
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
          <input id="username" name="username" type="text" autoComplete="username" required />
        </section>
        <section>
          <label htmlFor="new-password">Password </label>
          <input id="new-password" name="password" type="password" autoComplete="new-password" required />
        </section>
        <button type="submit">Sign up</button>
      </form>

    </>


  
  );
}

export default Signup;