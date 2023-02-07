const { Router } = require('express')
const userRouter = require('./user.routes')

const router = Router()

router.use('/api', userRouter)

module.exports = router