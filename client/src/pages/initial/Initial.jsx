import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getPokemons } from '../../services/getPokemon'
import './style.css'

const InitialPage = ({ socket }) => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([])
  const [initialPokemon, setInitialPokemon] = useState({})
  const [username, setUsername] = useState('')

  useEffect(() => {
    getPokemons([1, 4, 7, 25]).then((response) => {
      setPokemons(response)
    })
  }, [])

  const handleClick = () => {
    if (username && initialPokemon.name) {
      socket.emit('joined', { username, pokemonId: initialPokemon.id })
      navigate(`/home/${username}`)
    }
  }

  if (!pokemons.length) {
    return <div>loading...</div>
  }

  return (
    <div className="container">
      <div className="content-box">
        {pokemons.map((pokemon) => (
          <div className={`pokemon-card ${pokemon.types[0].type.name}`} style={{ backgroundColor: initialPokemon.name === pokemon.name ? 'white' : ''}} onClick={ () => setInitialPokemon(pokemon)}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt=""/>
            <div className="ul-types">{pokemon.types.map(({ type }) => (
              <span className={`li-type ${pokemon.types[0].type.name}`}>
                { type.name }
              </span>
            ))}</div>
          </div>
        )) }
      </div>
      <div className="input-box">
        <input type="text" placeholder="username" onChange={ ({ target }) => setUsername(target.value) }/>
        <button onClick={ handleClick }>Join</button>
      </div>
    </div>
  )
}

export default InitialPage