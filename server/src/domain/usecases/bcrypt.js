const bcrypt = require('bcrypt')

const hash = async (password) => {
  const salt = await bcrypt.genSalt()
  const hashedPass = await bcrypt.hash(password, salt)

  return hashedPass
}

const compare = async (password, hashedPass) => {
  const validPass = await bcrypt.compare(password, hashedPass)

  return validPass
}

module.exports = {
  hash,
  compare
}