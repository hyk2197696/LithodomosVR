var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')
var content_name = ""
exports.content_create_get = function(req, res, next){
    content_name = req.query.content_name
    res.render('content_create_form', {title: 'Create a New ' + content_name , content_name: req.query.content_name });

}

exports.content_create_post = function(req, res, next){
    req.checkBody('content_name', content_name + ' name must be specified.').notEmpty();
    req.sanitize('content_name').escape();

    var query = con.query("insert into sys." + content_name + ' values \(default, ' + req.body.content_name + '\)' );
    query.on('error', function(err) { throw err; })
         .on('end',function(){
            //if insert successfully jump to the success page
             res.render('success',{title:'New ' + content_name + ' creation success'});
        })
};