import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export const getPokemon = async (pokemonId) => {
  const pokemon = await axios.get(`${API_URL}/${pokemonId}`)

  return pokemon.data
}

export const getPokemons = async (pokemonIds) => {
  const pokemons = await Promise.all(pokemonIds.map((pokemonId) => getPokemon(pokemonId)))

  return pokemons
}
