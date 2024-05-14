const router = require('express').Router();
const controller = require('../controller/StarWarsLegoSets');
const validation = require('../validate/validate')
const {isAuthenticated} = require('../validate/authenticate');

router.get('/', controller.getAllStarWarsLegos);
router.get('/:id', controller.getSingleStarWarsLegos);

// Post, Update, Delete
router.post('/',  isAuthenticated, validation.validate, controller.postNewLego);
router.put('/:id', isAuthenticated, validation.validate, controller.updateLego);
router.delete('/:id', isAuthenticated, controller.deleteLego);

module.exports = router;
