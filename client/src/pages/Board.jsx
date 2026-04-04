import useAuth from '../hooks/useAuth';
import LogoutButton from '../components/LogoutBtn';

function Board() {
  const user = useAuth();
  return (
    <>
      <p>{user ? `Hello, ${user.username}!` : 'Not logged in'}</p>
      <LogoutButton />
    </>
  )

}

export default Board