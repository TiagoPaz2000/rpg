const { Router } = require('express')
const userRouter = require('./user.routes')
const pokemonRouter = require('./pokemon.routes')

const router = Router()

router.use('/api', userRouter)
router.use('/api', pokemonRouter)

module.exports = router