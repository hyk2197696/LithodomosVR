var con = require('./databasecontroller')
var app = require('../app')


exports.alter_get = function(req, res, next){
    var query = con.query("select count(*) as countAsset from sys.asset");
    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        //console.log(row);
        res.render('homepage', {title: 'Lithodomos Asset Management System', assetnum: row.countAsset});
    });
}