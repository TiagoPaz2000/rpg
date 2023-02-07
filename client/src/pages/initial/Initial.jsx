import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPokemons } from '../../services/getPokemon'
import { getRequest } from "../../services/apiRequest"
import './style.css'

const InitialPage = ({ socket }) => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([])
  const [initialPokemon, setInitialPokemon] = useState({})
  const user = 'mockuser'

  useEffect(() => {
    getRequest('/pokemon').then(({ data: response }) => {
        if (response.length) navigate(`/home/${user}`);
      }).catch(err => console.log(err))
    getPokemons([1, 4, 7, 25]).then((response) => {
      setPokemons(response)
    })
  }, [navigate])

  const handleClick = () => {
    if (initialPokemon.name) {
      socket.emit('joined', { pokemonId: initialPokemon.id })
      navigate(`/home/${user}`)
    }
  }

  if (!pokemons.length) {
    return <div>loading...</div>
  }

  return (
    <div className="container">
      <div className="content-box">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className={`pokemon-card ${pokemon.types[0].type.name}`} style={{ backgroundColor: initialPokemon.name === pokemon.name ? 'white' : ''}} onClick={ () => setInitialPokemon(pokemon)}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites.front_default} alt=""/>
            <div className="ul-types">{pokemon.types.map(({ type, index }) => (
              <span key={ type.name } className={`li-type ${pokemon.types[0].type.name}`}>
                { type.name }
              </span>
            ))}</div>
          </div>
        )) }
      </div>
      <div className="input-box">
        <button onClick={ handleClick }>Join</button>
      </div>
    </div>
  )
}

export default InitialPage