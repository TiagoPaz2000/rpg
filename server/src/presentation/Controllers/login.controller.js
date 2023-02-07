const LoginController = async (req, res, next) => {
  const { user, password } = req.body

  if (!user || !password) return res.status(401).json({ message: 'User or Password incorrect' })
  const id = Number.parseInt(Math.random() * 100)
  return res.status(200).json({ message: { user, id }})
}

module.exports = LoginController