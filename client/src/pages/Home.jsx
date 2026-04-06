// import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'; 
import Login from '../components/Login'
import Signup from '../components/Signup';

function Home() {
  const user = useAuth();

  return (
    <>
      <h1>Sign in</h1>
      <Login />
      <br></br>
      <p>{user ? `Hello, ${user.username}!` : 'Not logged in'}</p>
      <h1>Sign up</h1>
      <Signup />
      <p>See <a href='/about'>about</a>.</p>
    </>
  )
}

export default Home
