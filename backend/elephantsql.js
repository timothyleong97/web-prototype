var pg = require('pg');


var conString = "postgres://siqbgtid:aCoyZAgY1cmKXJvVMSBBszAx5UReSAsV@john.db.elephantsql.com:5432/siqbgtid" 
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log("Connected to psql on " + result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
  });
});

