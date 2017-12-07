var express = require('express')
var router = express.Router();

var homepage_controller = require('../controllers/homepagecontroller');


/* GET catalog home page. */
router.get('/', homepage_controller.index);


module.exports = router;