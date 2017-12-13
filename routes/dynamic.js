var express = require('express')
var router = express.Router();
var app = require('../app.js')
var homepage_controller = require('../controllers/homepagecontroller');
var search_controller = require('../controllers/assetsearchcontroller');
var create_controller = require('../controllers/assetcreatecontroller');
var alter_controller = require('../controllers/assetaltercontroller');
var delete_controller = require('../controllers/assetdeletecontroller');
var asset_controller = require('../controllers/assetcontroller');
var content_controller = require('../controllers/contentcreatecontroller');


router.get('/selectproject',create_controller.select_project);

router.get('/selectallproject',create_controller.select_all_project);

router.get('/selectallreference',create_controller.select_all_reference);


module.exports = router;