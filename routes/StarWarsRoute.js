const router = require('express').Router();
const controller = require('../controller/StarWarsLegoSets');
const validation = require('../validate/validate')

router.get('/', controller.getAllStarWarsLegos);
router.get('/:id', controller.getSingleStarWarsLegos);

// Post, Update, Delete
router.post('/',  validation.validate, controller.postNewLego);
router.put('/:id', validation.validate, controller.updateLego);
router.delete('/:id', controller.deleteLego);

module.exports = router;
