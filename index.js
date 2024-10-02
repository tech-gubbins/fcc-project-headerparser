// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

const PORT = process.env.PORT || 3000;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/whoami', (req, res) => {
  // Extract the IP address
  const ipaddress = 
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.connection.remoteAddress ||
    '';

  // Extract the preferred language
  const language = req.headers['accept-language'] || '';

  // Extract the software information
  const software = req.headers['user-agent'] || '';

  // Respond with the JSON object
  res.json({
    ipaddress,
    language,
    software,
  });
});