

const loginController = async (req, res, next) => {
  const { user, password } = req.body

  if (!user || !password) return res.status(401).json({ message: 'User and Password is required' })

  

  const id = Number.parseInt(Math.random() * 100)
  return res.status(200).json({ user, id })
}

module.exports = loginController