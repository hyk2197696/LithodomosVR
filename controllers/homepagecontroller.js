var con = require('./databasecontroller')
var app = require('../app')
var formidable = require('formidable');
var fs = require('fs');


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
    //     res.render('homepage',{title : 'Lithodomos Asset Management System', assetnum: result[0] });
    // });
}

exports.test = function(req, res, next) {
    res.download('/file/C&IS Graduate Attributes.pdf');
    res.render('test', {title: 'Lithodomos Asset Management System'});

}

exports.test_post = function(req, res, next) {

    res.download('/Users/Render4/WebstormProjects/lithodomosVR/file/C&IS Graduate Attributes.pdf');
    //res.write('File uploaded and moved!');
    //res.end();

    //console.log(req.body.textload);
}

exports.success_get = function(req, res, next) {
    res.render('success', {title: 'Lithodomos Asset Management System'});
}
