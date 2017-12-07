var con = require('./databasecontroller')
var app = require('../app')



exports.index = function(req, res, next){

    con.query("select count(*) from sys.asset", function (err, result, fields) {
        res.render('homepage',{title : 'Lithodomos Asset Management System', assetnum: result });
    });
}
