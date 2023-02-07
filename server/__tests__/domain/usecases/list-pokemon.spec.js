const { listUserPokemons } = require('../../../src/domain/usecases')

describe('ListPokemon', () => {
  it('Should return all pokemons by user', async () => {
    const userId = 1
    const sut = await listUserPokemons(userId)
    const expected = [
      { id: 1, pokemonId: 1, name: 'charizard' },
      { id: 2, pokemonId: 2, name: 'pikachu' }
    ]
    expect(sut).toEqual(expected)
  })
})