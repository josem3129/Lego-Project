const express = require('express');
const Router = express.Router();

Router.use('/', require('./swagger'))
Router.use('/StarWars', require('./StarWarsRoute'))
Router.use('/HarryPotter', require('./HarryPotterRoute'))

module.exports = Router;