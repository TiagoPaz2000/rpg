const { hash, compare } = require('../../../src/domain/usecases')
const bcrypt = require('bcrypt')

describe('Bcrypt Functions', () => {
  const password = 'password'
  const hashedPass = 'hashedPassword'

  it('Should return a hashed password', async () => {
    const sut = await hash(password)

    expect(sut).not.toBe(password)
  })

  it('Should return a expected mocked password', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPass)
    const sut = await hash(password)

    expect(sut).toBe(hashedPass)
  })

  it('Should return true if password is equal hashPassword', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
    const sut = await compare(password, hashedPass)

    expect(sut).toBeTruthy()
  })

  it('Should return false if password is not equal hashPassword', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false)
    const sut = await compare(password, hashedPass)

    expect(sut).not.toBeTruthy()
  })
})