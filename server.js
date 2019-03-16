const express = require("express");
const app = express();
const geoip = require('geoip-lite');
const mysql = require('mysql');
const moment = require('moment')


// config sql(local)
/*var conn = mysql.createConnection({
  host: "localhost",
  user: "sekyunoh",
  password: "",
  database: "blog"
});*/

// config sql(remote)
let secretObj = require(__dirname+'/mysqlConfig.js');
console.log(secretObj);
var conn = mysql.createPool({
  host:secretObj.host,
  user:secretObj.user,
  password:secretObj.password,
  database:secretObj.database
});

app.use('/static', express.static('static'));
app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);

//Home
app.get('/', function (req, res) {
  // get ip address
  let ip = req.headers['x-forwarded-for'];
  // loop up ip and get information
  let geo = geoip.lookup(ip);
  if(geo != null){
    recordVisitor(ip, geo['city'], geo['country']);
  }else{
    recordVisitor(null,null,null);
  }
  //console.log(geo);

  res.render('home.html');
});

/*
recordVisitor

A function that stores information of visitor based on their IP address
*/
function recordVisitor(ip, city, country){
  const time = moment().format('YYYY-MM-DD kk:mm:ss');

  conn.query("insert into visitor (ip, city, country, date) values (?,?,?,?)",[ip, city, country, time], function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    //console.log(result);
  });
}

//About
app.get('/about', function(req,res){
  res.render('about.html');
})
//Project
app.get('/project', function(req, res){
  res.render('project.html')
})
//Contact
app.get('/contact', function(req, res){
  res.render('contact.html')
})

app.listen(3000,function(){
  console.log('Web server running on 3000 port!');
});
