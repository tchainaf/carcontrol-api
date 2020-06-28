const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/getCategories', controller.getCategories);
router.get('/getList/:category', controller.getListByCategory);
router.get('/read/:category', controller.getPart);
router.post('/put', controller.putPart);

module.exports = router;
