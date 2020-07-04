const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/getMainReason', controller.getReason);
router.get('/getCategory', controller.getCategory);
router.get('/getParts', controller.getParts);
router.get('/getNextExchange', controller.getNextExchange);

module.exports = router;
