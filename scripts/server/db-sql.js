/*eslint-disable no-param-reassign */
'use strict';
const moment = require('moment');
const Knex = require('knex');

function insertVisitor(connection,visitorInfo,ipAddress){
	visitorInfo.ip_address = ipAddress;
	visitorInfo.timestamp = moment().toString();
	return insertData(connection, visitorInfo, "visitors");
}
function insertButtonPresser(connection,presserInfo,ipAddress){
	presserInfo.ip_address = ipAddress;
	presserInfo.timestamp = moment().toString();
	return insertData(connection, presserInfo, "button_pressers");
}
function getRandomNumber(min, max, round){
	round = round || 1;
	let rand = Math.round((Math.random() * (max - min + 1) + min)/round) * round;
	while(rand < min || rand > max){
		rand = Math.round((Math.random() * (max - min + 1) + min)/round) * round;
	}
	return rand;
}

function getText(connection, randNum, randNum2){
	randNum = randNum || getRandomNumber(1,50);
	randNum2 = randNum2 || getRandomNumber(1,50);

	return connection("messages").select().where(function() {
		this.where('id', randNum).orWhere('id', randNum2);
	});
}
function getVisitors(connection, agentInfo){
	return connection("visitors").select();
}
function getButtonPressers(connection,agentInfo){
	return connection("button_pressers").select();
}
function insertData(connection, info, tableName){
	return connection(tableName).insert(info);
}
function connect () {
  const config = {
  	host: "104.197.102.194",
  	port: 3306,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };
  
  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    config.socketPath = '/cloudsql/' + process.env.INSTANCE_CONNECTION_NAME;
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  });

  return knex;
}
module.exports = {
	insertVisitor : insertVisitor,
	insertButtonPresser : insertButtonPresser,
	getText : getText,
	getVisitors : getVisitors,
	getButtonPressers : getButtonPressers,
	connect : connect
};