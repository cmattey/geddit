import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import tokenService from './services/token'
import TableList from './components/TableList'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      tokenService.setToken(user.token)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      console.log(user.username, " logged in")
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      tokenService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.error("Exception occured in handlelogin frontend: ", exception)
    }
  }

const handleLogout = () => {
  window.localStorage.removeItem('loggedUser')
  setUser(null)
}

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Login</h1>
      <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const userInfo = () => (
    <div>
      {user.username} logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )


  return (
    <div className="App">
      <h1>Geddit!</h1>
      <div>
        {user === null ? loginForm() : userInfo()}
        <TableList user = {user} />
      </div>
    </div>
  );
}

export default App;
