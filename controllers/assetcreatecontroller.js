var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')
var exp = require('express')

exports.create_get = function(req, res, next){
    res.render('create_form', {title: 'Create a New Asset'});
}

function find_project_from_db(name, a){
    var sql = "select * from sys.project where name like \'%" + name + "%'"
    var project_list = [];
    var query = con.query(sql);

    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        console.log(row);
        project_list.push(row);
    });

    query.on('end',function(){
        a(project_list);
    });
}

exports.select_project = function(req, res){
    console.log("into dynamic test\n");
    find_project_from_db(req.query.name, function(results){
        res.end(JSON.stringify(results));
    });


}

exports.create_post = function(req, res, next) {

    req.checkBody('first_name', 'First name must be specified.').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
    req.checkBody('family_name', 'Family name must be specified.').notEmpty();
    req.checkBody('family_name', 'Family name must be alphanumeric text.').isAlphanumeric();
    req.checkBody('date_of_birth', 'Invalid date').optional({ checkFalsy: true }).isISO8601();
    req.checkBody('date_of_death', 'Invalid date').optional({ checkFalsy: true }).isISO8601();

    req.sanitize('first_name').escape();
    req.sanitize('family_name').escape();
    req.sanitize('first_name').trim();
    req.sanitize('family_name').trim();

    // check for errors here because below code will modify the value of dates which may cause validation error.
    var errors = req.validationErrors();
    req.sanitize('date_of_birth').toDate();
    req.sanitize('date_of_death').toDate();


    var author = new Author(
        { first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });

    if (errors) {
        res.render('author_form', { title: 'Create Author', author: author, errors: errors});
        return;
    }
    else {
        // Data from form is valid

        author.save(function (err) {
            if (err) { return next(err); }
            //successful - redirect to new author record.
            res.redirect(author.url);
        });
    }

};