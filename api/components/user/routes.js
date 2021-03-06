const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/create', controller.createUser);
router.get('/read', controller.readUser);
router.post('/update', controller.updateUser);
router.post('/delete', controller.deleteUser);

module.exports = router;
