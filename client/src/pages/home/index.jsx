import { useState } from "react";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import { getPokemons } from "../../services/getPokemon";
import './style.css'

const Home = ({ socket }) => {
  const location = useLocation();
  const username = location.pathname.slice(6)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [userMoney, setUserMoney] = useState(0)

  socket.on('userInfo', ({ user }) => {
    setUserMoney(user.money)
    getPokemons(user.pokemons).then((response) => {
      setPokemons(response)
    })
  })

  const sendMessage = () => {
    socket.emit('sendMessage', { author: username, message })
    setMessage('')
  }

  useEffect(() => {
    socket.emit('retrieveImages', {})
    socket.on('getMessages', (messages) => {
      setMessages(messages)
    })
  }, [socket])

  useEffect(() => {
    socket.emit('findUserInfo', { username })
  }, [socket, username])

  if (!pokemons.length) {
    return <div>loading...</div>
  }

  return (
    <div className="container">
      <div className="if">
        <h3>pokemons: </h3>
        <p>{username}</p>
        <p>{userMoney} ¥</p>
        <div>
          {pokemons.map((pokemon) => (
            <div>
              <span>{pokemon.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="fc">
        <h1>Functions</h1>
      </div>
      <div className="ch">
        <h4>Chat: </h4>
        <div className="chat-messages">
          {messages.map((msg) => (
            <div>
              <span>{msg.author}: </span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>
        <label htmlFor="">
          <input type="text" value={message} onChange={ ({ target }) => setMessage(target.value)}/>
          <button type="button" onClick={sendMessage}>Send</button>
        </label>
      </div>
    </div>
  )
}

export default Home