const express = require('express');
const Router = express.Router();

Router.use('/', require('./swagger'))
Router.use('/lego', require('./sets'))
Router.use('/user', require('./users'))

module.exports = Router;