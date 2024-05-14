const router = require('express').Router();
const base = require('../controller/HarryPotterLegoSets');
const {isAuthenticated} = require('../validate/authenticate');

router.get('/', base.getallHarryPotterLegoSets);
router.get('/:id', base.GetSingleHarryPotterLegoSets);

// Post, Update, Delete
router.post('/', isAuthenticated, base.postHarryPotterSet);
router.put('/:id', isAuthenticated, base.updatHarryPotterSet);
router.delete('/:id', isAuthenticated, base.deleteHarryPotterSet);


module.exports = router;