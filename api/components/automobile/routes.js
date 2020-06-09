const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/getTypes', controller.getTypes);
router.get('/getList/:idtipo', controller.getListByType);

module.exports = router;
