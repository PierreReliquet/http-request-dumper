var http = require('http');
var connect = require('connect');

var port = 1234;

var app = connect();

app.use(function (req, res) {
  var headers = {};
  for (var i = 0; i < req.rawHeaders.length; i += 2) {
    headers[req.rawHeaders[i]] = req.rawHeaders[i + 1];
  }

  var queryParametersAsObject = {};

  if (req._parsedUrl && req._parsedUrl.query) {
    var queryParams = req._parsedUrl.query.split("&");
    queryParams.forEach(function (queryParam) {
      queryParametersAsObject[queryParam.split('=')[0]] = queryParam.split('=')[1];
    });
  }

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': headers['Access-Control-Request-Headers'],
    'Content-Type': 'text/html'
  });
  res.end('URL: ' + req.url +
    '<br>Query params: ' + JSON.stringify(queryParametersAsObject, null, 2) +
    '<br>Headers: ' + JSON.stringify(headers, null, 2));
});

console.log('Listening to requests on port ' + port);
http.createServer(app).listen(port);
