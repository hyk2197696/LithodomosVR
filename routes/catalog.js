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
/* GET catalog home page. */
router.get('/', homepage_controller.index);

router.get('/assetsearch', search_controller.search_get);

router.post('/assetsearch', search_controller.search_post);

router.get('/assetlist', asset_controller.list_get);

router.get('/asset', asset_controller.asset_get);

router.get('/assetcreate', create_controller.create_get);

router.get('/assetalter', alter_controller.alter_get);

router.get('/assetdelete', delete_controller.delete_get);

router.get('/contentcreate',content_controller.content_create_get);

router.post('/contentcreate',content_controller.content_create_post);

router.get('/test',homepage_controller.test);

module.exports = router;