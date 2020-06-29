const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/getTypes', controller.getTypes);
router.get('/getList/:id_type', controller.getListByType);
router.get('/read', controller.getAutomobile); //#BF-01#
router.post('/update', controller.updateAutomobile);
router.post('/kilometers', controller.updateKilometers);

module.exports = router;
