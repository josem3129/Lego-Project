const router = require('express').Router();
const controller = require('../controller/legoSets');
const validation = require('../validate/validate')

router.get('/', controller.getAllLegos);
router.get('/:id', controller.getSingleLegos);

// Post, Update, Delete
router.post('/',  validation.validationRules(), validation.validate, controller.postNewLego);
router.put('/:id', validation.validationRules(), validation.validate, controller.updateLego);
router.delete('/:id', controller.deleteLego);

module.exports = router;
