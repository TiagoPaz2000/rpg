const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET || 'secret_key'

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey)
  return token
}

const verifyToken = (token) => {
    const decodedToken = jwt.verify(token, secretKey)
    return decodedToken
}

module.exports = {
  generateToken,
  verifyToken
}