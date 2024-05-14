const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json')
const {checkLogin} = require('../validate/authenticate')

router.use('/api-docs', checkLogin, swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;