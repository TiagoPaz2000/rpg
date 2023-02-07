const { Router } = require('express')
const Controller = require('../Controllers')

const route = Router()

route.get('/pokemon', Controller.listUserPokemonsController)

module.exports = route