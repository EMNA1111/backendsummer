var express = require('express');
var router = express.Router();
const osController = require('../controllers/osController');

/* GET OS information */
router.get('/', osController.getOsInformation); // Changé de '/getOsInformation' à '/'

module.exports = router;