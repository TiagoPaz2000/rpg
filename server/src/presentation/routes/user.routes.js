const { Router } = require('express')
const Controller = require('../Controllers')

const route = Router()

route.post('/login', Controller.loginController)

module.exports = route