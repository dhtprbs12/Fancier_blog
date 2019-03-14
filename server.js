const express = require("express");
const app = express();

app.use('/static', express.static('static'));
app.set('views', __dirname + '/templates');
app.engine('html', require('ejs').renderFile);

//Home
app.get('/', function (req, res) {
  res.render('home.html');
});

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
