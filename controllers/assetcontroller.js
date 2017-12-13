var con = require('./databasecontroller')
var app = require('../app')


exports.list_get = function(req, res, next){
    var query = con.query("select count(*) as countAsset from sys.asset");
    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        //console.log(row);
        res.render('homepage', {title: 'Lithodomos Asset Management System', assetnum: row.countAsset});
    });
}

exports.asset_get = function(req, res, next){
    var query = con.query("select *  from sys.asset where idAsset = " + req.query.id);
    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        console.log(row);
        res.render('asset', {title: row.name , asset: row});
    });
}

exports.asset_download = function(req, res,next) {
    var sql = 'select directory from sys.asset where idAsset = ' + req.query.id;
    console.log(sql);
    var query = con.query(sql);
    query.on('result', function (row){
        console.log(" result : ");
        console.log(row);
        console.log(row.directory);
        res.download(row.directory);
    });
}