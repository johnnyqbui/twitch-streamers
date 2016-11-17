var express = require('express');

// Create app
var app = express();

// Access environment
const PORT = process.env.PORT || 8000;

// Express middleware
app.use(function(request, response, next) {
	if (request.headers['x-forwarded-proto'] === 'https') {
		response.redirect('http://' + request.hostname + request.url);
	} else {
		next();
	}
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
