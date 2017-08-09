// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var headers = request.headers;
  var ip = getValue(headers, "x-forwarded-for");
  var language = getValue(headers, "accept-language");
  var software = headers["user-agent"];
  software = software.substring(software.indexOf('(') + 1, software.indexOf(')'));
  var data = {
    "ipaddress": ip,
    "language": language,
    "software": software
  }
  response.send(data);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function getValue(headers, prop){
  var str = headers[prop];
  return str.substring(0, str.indexOf(','));
}