'use strict';

var server = require('server');
//Define a variable named userLoggedIn that requires the userLoggedIn script

server.get('Start', //Invoke the middleware step that validates login 
	function (req, res, next) {

	res.print('<html><body><h1>You are now a logged in user!</h1></body></html>');
    next();
	 
});

module.exports = server.exports();