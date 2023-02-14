const { verifyUserLogin } = require('../../../src/domain/usecases')
const userRepository = require('../../../src/infra/repository/user.repository')
const bcrypt = require('bcrypt')

describe('Verify User Login', () => {
  it('Should return an error when userRepository return an empty object', async () => {
    jest.spyOn(userRepository, 'findByUser')
      .mockResolvedValue({})
    
    const sut = await verifyUserLogin('user', 'password')

    expect(sut).toEqual({ err: 'User or Password incorrect' })
  })

  it('Should return an error when password are incorrect', async () => {
    jest.spyOn(userRepository, 'findByUser')
      .mockResolvedValue({ user: 'user', password: 'password', email: 'email' })
    
    const sut = await verifyUserLogin('user', 'incorrectPassword')

    expect(sut).toEqual({ err: 'User or Password incorrect' })
  })

  it('Should return user entity without password', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
    jest.spyOn(userRepository, 'findByUser')
      .mockResolvedValue({ user: 'user', password: 'password', email: 'email' })
    
    const sut = await verifyUserLogin('user', 'password')

    expect(sut).toEqual({ user: 'user', email: 'email' })
  })
})