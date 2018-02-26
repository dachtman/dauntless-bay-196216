'use strict';

const path = require('path');
const express = require('express');
const app = express();
app.use('/public',express.static(__dirname+'/scripts/client'));
app.get('/', function(req, res){
	getPage(res, "home");
});
app.get('/visitors',function(req,res){
	getPage(res, "table");	
});
app.get('/button_pressers',function(req,res){
	getPage(res, "table");
});

if (module === require.main) {
  const server = app.listen(process.env.PORT || 8081, function() {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

function getPage ( res, pageName ){
	res.sendFile(path.join(__dirname,"pages",pageName + ".html"));
}