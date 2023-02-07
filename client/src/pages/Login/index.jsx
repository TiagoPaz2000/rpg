import { Container } from "./style";
import InputComponent from "../../components/input";
import ButtonComponent from "../../components/button";
import { useState } from "react";
import { postRequest } from "../../services/apiRequest"


const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState({})

  const handleSubmit = ({ user, password }) => {
    postRequest('/signin', { user, password }, {})
      .then((response) => {
        setLoginStatus(response)
      }).catch(err => setLoginStatus({ error: err.message }))
  }

  return (
    <Container>
      <InputComponent placeholder="user" onChange={ ({ target }) => setUser(target.value)} />
      <InputComponent placeholder="password" onChange={ ({ target }) => setPassword(target.value)}/>
      <ButtonComponent text="Login" onClick={ () => handleSubmit(user, password) } />
    </Container>
  )
}

export default Login