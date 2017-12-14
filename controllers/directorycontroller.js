/**
 * Controller for fake directory
 */

var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')

exports.find_get = function(req, res, next) {
    var sql = 'select * from sys.fakedirectory where super';

    if(req.query.id == 0){
        sql += ' is null';
    }else{
        sql += '=' + req.query.id;
    }
    console.log('new query: ' +  sql);
    var query_folder = con.query(sql);
    var folder_list = [];
    var asset_list = [];
    query_folder.on('result',function(row){
        console.log(row);
        folder_list.push(row);
    })
    query_folder.on('end',function(){
        sql = 'select * from sys.asset where location = ';
        if(req.query.id == 0){
            sql += '1';
        }else{
            sql +=  req.query.id;
        }
        console.log('new query: ' + sql);
        var query_asset = con.query(sql);
        query_asset.on('result', function(row){
            console.log(row);
            asset_list.push(row);
        })

        query_asset.on('end',function(){
            res.render('assetfind', { title: 'Find an Asset', folder_list:folder_list, asset_list:asset_list});
        });

    })


};

exports.find_post =  function(req, res, next) {
    res.render('search_form', { title: 'Search Asset' });
};
