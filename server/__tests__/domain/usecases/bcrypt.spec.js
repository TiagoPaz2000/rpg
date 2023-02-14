const { hash } = require('../../../src/domain/usecases')
const bcrypt = require('bcrypt')

describe('Bcrypt Functions', () => {
  const password = 'password'
  it('Should return a hashed password', async () => {
    const sut = await hash(password)

    expect(sut).not.toBe(password)
  })

  it('Should return a expected mocked password', async () => {
    const hashedPass = 'hashedPassword'
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPass)
    const sut = await hash(password)

    expect(sut).toBe(hashedPass)
  })
})