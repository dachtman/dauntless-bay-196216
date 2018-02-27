'use strict';
const path = require('path');
const bodyParser = require ("body-parser");
const express = require('express');
const app = express();
const db = require('./scripts/server/db-sql.js')

app.use('/public',express.static(__dirname+'/scripts/client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.get('/', function(req, res){
	getPage(res, "home");
});
app.get('/visitors',function(req,res){
	getPage(res, "table");	
});
app.get('/button_pressers',function(req,res){
	getPage(res, "table");
});
app.get('/data/:table',function(req,res){
	var tableName = req.params.table;
	var functionName = false;
	switch(tableName){
		case "text":
			functionName = "getText";
			break;
		case "visitors":
			functionName = "getVisitors";
			break;
		case "button_pressers":
			functionName = "getButtonPressers";
			break;
	}
	if(functionName){
		var connection = db.connect();
		var result = db[functionName](connection);
		result.then(function(data){
			return res.status(200).send(data);
		});
	}else{
		res.status(400).send({
			table : tableName,
			message : "This table does not exist"
		});
	}
});
app.post('/data/:table',function(req,res){
	var tableName = req.params.table;
	var functionName = false;
	var body = req.body;
	switch(tableName){
		case "visitors":
			functionName = "insertVisitor";
			break;
		case "button_pressers":
			functionName = "insertButtonPresser";
			break;
	}
	if(functionName){
		var connection = db.connect();
		var result = db[functionName](connection,body,req.ip);
		result.then(function(r){
			res.sendStatus(200);
		},function(r){
			console.log(r);
			res.sendStatus(400);
		});
	}else{
		res.status(400).send({
			table : tableName,
			message : "This table does not exist"
		});
	}
	
});

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8080, function() {
    const port = server.address().port;
    console.log('App listening on port ' + port);
  });
}

function getPage ( res, pageName ){
	res.sendFile(path.join(__dirname,"pages",pageName + ".html"));
}