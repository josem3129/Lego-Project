const router = require('express').Router();
const controller = require('../controller/legoSets');

router.get('/', controller.getAllLegos);
router.get('/:id', controller.getSingleLegos);

// Post, Update, Delete
router.post('/',  controller.postNewLego);
router.put('/:id', controller.updateLego);
router.delete('/:id', controller.deleteLego);

module.exports = router;
