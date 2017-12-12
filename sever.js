var express = require("express");

var i = 0;


var app = express();
app.set("view engine","jade");
app.get("/",function(req,res){
    getResults(function(results){
        res.render("create_form",{results:results});
    });
});

function getResults(cb){
    cb("<div>Result "+(i++)+"</div><div>Result "+(i++)+"</div><div>Result "+(i++)+"</div>");
}
app.get("/dynamictest",function(req,res){
    getResults(function(results){
        res.writeHead(200,"OK",{"Content-Type":"text/html"});
        res.end(results);
    });
});

app.listen(80);