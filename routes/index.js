const express = require('express');
const { route } = require('./swagger');
const passport = require('passport');
const Router = express.Router();

Router.use('/', require('./swagger'))
Router.use('/StarWars', require('./StarWarsRoute'))
Router.use('/HarryPotter', require('./HarryPotterRoute'))

Router.get('/login', passport.authenticate('github'), (req, res) =>{})

Router.get('/logout', function (req, res, next ) {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/')
    });
});

module.exports = Router;