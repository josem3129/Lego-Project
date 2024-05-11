const express = require('express');
const Router = express.Router();

Router.use('/', require('./swagger'))
Router.use('/lego', require('./StarWarsRoute'))
Router.use('/user', require('./HarryPotterRoute'))

module.exports = Router;