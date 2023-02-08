const userRepository = require('../../infra/repository/user.repository')

const verifyUserLogin = async (user, encryptedPass) => {
  const { password, ...userWithoutPassword } = await userRepository.findByUser({ user })

  if (password !== encryptedPass) return ({ err: 'User or Password incorrect' })

  return ({ userWithoutPassword })
}

module.exports = verifyUserLogin