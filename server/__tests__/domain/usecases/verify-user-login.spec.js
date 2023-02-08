const { verifyUserLogin } = require('../../../src/domain/usecases')
const userRepository = require('../../../src/infra/repository/user.repository')

describe('Verify User Login', () => {
  it('Should return an error when userRepository return an empty object', async () => {
    jest.spyOn(userRepository, 'findByUser')
      .mockResolvedValue({})
    
    const sut = await verifyUserLogin('user', 'password')

    expect(sut).toEqual({ err: 'User or Password incorrect' })
  }) 
})