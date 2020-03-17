import React, {useState, useEffect} from 'react';
import loginService from './services/login'
import tokenService from './services/token'
import registerService from './services/register'
import TableList from './components/TableList'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [registerName, setRegisterName] = useState('')
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

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

  const handleRegister = async (event) => {
    event.preventDefault()

    try{

      const user = await registerService.register({'username': registerUsername, 'name': registerName, 'password': password})
      console.log("User Registered: ", user.username)

      setRegisterName('')
      setRegisterUsername('')
      setRegisterPassword('')

    } catch(exception){
      console.error("Exception in registration fe: ", exception)
    }
  }

  const registerForm = () => (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        Your Name
          <input
            type="text"
            value={registerName}
            name="Username"
            onChange={({ target }) => setRegisterName(target.value)}
            required
          />
      </div>
      <div>
        Username
          <input
            type="text"
            value={registerUsername}
            name="Username"
            onChange={({ target }) => setRegisterUsername(target.value)}
            required
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={registerPassword}
            name="Password"
            onChange={({ target }) => setRegisterPassword(target.value)}
            required
          />
      </div>
      <button type="submit">register</button>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
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

  const homePage = () => {
    return(
      <>
      {loginForm()}
      {registerForm()}
      </>
    )
  }

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
        {user === null ? homePage(): userInfo()}
        <TableList user = {user} />
      </div>
    </div>
  );
}

export default App;
