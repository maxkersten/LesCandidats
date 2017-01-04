var React = require('react');
var ReactDOM = require('react-dom');
var Survey = require("survey-react");
Survey.Survey.cssType = "bootstrap";


//////////////////////////////////
///  Import the server modules ///
//////////////////////////////////
var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var querystring = require('querystring');


//////////////////////////////////////
/// Import the JS backend modules ///
/////////////////////////////////////

var userPreference = require('./controllers/userPreference');
var userPoliticalCompliance = require('./controllers/userPoliticalCompliance')

/////////////////////////////////////////
/// Public files : CSS and Javascript ///
/////////////////////////////////////////
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

/////////////////////////////////////////
/// Package used
/////////////////////////////////////////
app.use(bodyParser.urlencoded( {extended: true}));
app.use(bodyParser.json());

/////////////////////////////////////////
/// Global variables
/////////////////////////////////////////
var themes;

/////////////////////////
/// Launch the server ///
/////////////////////////
server.listen(8080);

app.get('/', function (req, res) {
  res.render('main.html');
});

app.get('/biographies', function (req, res) {
  res.render('bio.html');
});

app.get('/analyse', function (req, res) {
  res.render('analyse.html');
});

app.get('/concept', function (req, res) {
  res.render('concept.html');
});

app.get('/sources', function (req, res) {
  res.render('sources.html');
});

app.get('/test', function (req, res) {
  res.sendFile(__dirname + '/views/test.html');
});

app.get('/questions', function(req, res) {
  var userThemeSelection = querystring.parse(url.parse(req.url).query);
  var renderSurvey = function(questions)
  {
    res.render('questions.ejs', {surveyJSON:questions});
  };
  var totalNumberOfQuestions = 20;
  userPreference.constructSurvey(userThemeSelection, totalNumberOfQuestions,  renderSurvey);
});


/*
app.post('/questions', function(req, res) {
  console.log("ok");
  var renderSurvey = function(questions)
  {
    res.render('questions.ejs', {surveyJSON:questions});
  };
  var totalNumberOfQuestions = 20;
  userPreference.constructSurvey(req.body, totalNumberOfQuestions,  renderSurvey);
});
*/

app.post('/answers', function(req, res) {
  var renderResults = function(results)
  {
    res.render('answers.ejs', {results:results});
  }
  userPoliticalCompliance.computeResults(req.body, renderResults);

});
