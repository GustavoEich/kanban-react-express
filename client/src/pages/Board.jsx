import useAuth from '../hooks/useAuth';

function Board() {
  const user = useAuth();
  return (
    <>
      <p>{user ? `Hello, ${user.username}!` : 'Not logged in'}</p>
    </>
  )

}

export default Board