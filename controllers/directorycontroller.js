var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')

exports.find_get = function(req, res, next) {
    res.render('assetfind', { title: 'Find an Asset' });
};

exports.find_post =  function(req, res, next) {
    res.render('search_form', { title: 'Search Asset' });
};
