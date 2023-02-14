const bcrypt = require('bcrypt')

const hash = async (password) => {
  const salt = await bcrypt.genSalt()
  const hashedPass = await bcrypt.hash(password, salt)

  return hashedPass
}

module.exports = {
  hash,
}