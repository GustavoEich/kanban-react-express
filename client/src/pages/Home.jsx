import { useEffect, useState } from 'react'
import MockLoginBtn from '../components/MockLoginBtn'

function Home() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'))

  const updateLogin = () => {
    const currentStatus = localStorage.getItem('isLogged') === 'true'
    const nextStatus = !currentStatus
    localStorage.setItem('isLogged', String(nextStatus))
    setIsLogged(String(nextStatus))
  }

  return (
    <>
      <p>Please login.</p>
      <p>See <a href='/about'>about</a>.</p>
      <p>
        <MockLoginBtn handleLogin={updateLogin} />
      </p>
      <p>
        Logged in: { isLogged } {/* cant try to render localStorage.getItem('isLogged'), even though it has the correct value */}
      </p>
    </>
  )
}

export default Home
