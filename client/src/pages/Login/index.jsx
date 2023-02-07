import { Container } from "./style"
import InputComponent from "../../components/input"
import ButtonComponent from "../../components/button"
import { useState, useEffect } from "react"
import { postRequest } from "../../services/apiRequest"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState({})
  const [loginStatus, setLoginStatus] = useState({})
  const navigate = useNavigate();

  const handleSubmit = () => {
    postRequest('/login', { user, password }, {})
      .then(({ data: response }) => {
        setLoginStatus(response)
      }).catch(err => setLoginError({ err: err.data.message }))
  }

  useEffect(() => {
    if (loginStatus.user) {
      navigate(`/initial/`);
    }
  }, [loginStatus, navigate]);

  return (
    <Container>
      <InputComponent placeholder="user" handleChange={ ({ target }) => setUser(target.value)} />
      <InputComponent placeholder="password" handleChange={ ({ target }) => setPassword(target.value)}/>
      <ButtonComponent text="Login" handleClick={ handleSubmit } />
    </Container>
  )
}

export default Login