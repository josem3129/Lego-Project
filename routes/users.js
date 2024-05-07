const router = require('express').Router();
const base = require('../controller/users');
console.log(base.deleteUser);

router.get('/', base.getUsers);
router.get('/:id', base.getUser);

// Post, Update, Delete
router.post('/',  base.postUser);
router.put('/:id', base.updateUser);
router.delete('/:id', base.deleteUser);


module.exports = router;