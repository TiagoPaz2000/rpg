const { listUserPokemons } = require('../../domain/usecases')

const listUserPokemonsController = async (req, res, next) => {
  const { userId } = req.body

  const pokemons = await listUserPokemons(userId)

  return res.status(200).json({ data: pokemons })
}

module.exports = listUserPokemonsController