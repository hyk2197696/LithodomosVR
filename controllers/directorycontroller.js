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
            res.render('assetfind', { title: 'Find an Asset', folder_list:folder_list, asset_list:asset_list,folderid:req.query.id});
        });

    })


};

exports.find_post =  function(req, res, next) {
    res.render('search_form', { title: 'Search Asset' });
};



exports.check_folder_existance = function (req, res, next ){
    sql = 'select count(*) as count from sys.fakedirectory where name = \'' + req.query.name + '\' and super = ' + req.query.id;
    console.log('new query' + sql);

    query = con.query(sql);
    query.on('result',function(row){
        if(row.count == '0'){

            sql = 'insert into sys.fakedirectory values (default, \'' + req.query.name + '\' , ';
            if(req.query.id == 0){
                sql += 'null)';
            }else{
                sql += req.query.id + ')'
            }
            console.log('new query: ' + sql);
            con.query(sql).on('end',function(){
                res.end('success');
            })
        }
        else{

        }res.end('Folder exist!');

    })

    //res.end('success');
};

exports.get_full_folder_directory = function (req,res,next){
    var directory = '';
    var id = req.query.id;
    sql = 'select name, ifnull(super,\'null\'\) as super from sys.fakedirectory where idfakedirectory =' +  req.query.id;
    console.log("new query" + sql);
    con.query(sql).on('result',function(row){
        console.log(row);
        directory = row.name.toString();
        id = row.super.toString();

    });
    while(id != 'null'){
        sql = 'select name,ifnull(super,\'null\') as super from sys.fakedirectory where idfakedirectory = '+ id;
        console.log('new query :' + sql);
        con.query(sql).on('result', function(){
            directory = row.name.toString() + '/' + directory;
            id = row.super.toString();
        })


    }
    res.end(directory);
}