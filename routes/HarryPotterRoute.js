const router = require('express').Router();
const base = require('../controller/HarryPotterLegoSets');

router.get('/', base.getallHarryPotterLegoSets);
router.get('/:id', base.GetSingleHarryPotterLegoSets);

// Post, Update, Delete
router.post('/',  base.postHarryPotterSet);
router.put('/:id', base.updatHarryPotterSet);
router.delete('/:id', base.deleteHarryPotterSet);


module.exports = router;