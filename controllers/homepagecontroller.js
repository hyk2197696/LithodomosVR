var con = require('./databasecontroller')
var app = require('../app')



exports.index = function(req, res, next){
    var query = con.query("select count(*) as countAsset from sys.asset");
    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        //console.log(row);
        res.render('homepage',{title : 'Lithodomos Asset Management System', assetnum: row.countAsset });
    });


    // con.query("select count(*) from sys.asset", function (err, result, fields) {
    //     console.log(result);
    //     console.log(result[0]);
    //     var [a,b] = result;
    //     console.log(b);
    //     res.render('homepage',{title : 'Lithodomos Asset Management System', assetnum: result[0] });
    // });
}
