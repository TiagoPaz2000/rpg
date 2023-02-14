const userRepository = require('../../infra/repository/user.repository')
const { compare } = require('./bcrypt')

const verifyUserLogin = async (user, encryptedPass) => {
  const { password, ...userWithoutPassword } = await userRepository.findByUser({ user })
  if (!password || !await compare(password, encryptedPass)) return ({ err: 'User or Password incorrect' })

  return userWithoutPassword 
}

module.exports = verifyUserLogin