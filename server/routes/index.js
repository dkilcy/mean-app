/*****************************************************************************
 *
 * @author dkilcy
 * 
 ****************************************************************************/
var global = require('../global.js');

var expressJwt 	= require('express-jwt'); 				//https://npmjs.org/package/express-jwt

var ContentHandler 	= require('./content');
var SessionHandler 	= require('./session');
var ErrorHandler 	= require('./error').errorHandler;

/**
 * 
 */
module.exports = exports = function(app, db) {

	var unauthorizedError401 = function(err, req, res, next) {
		if (err.constructor.name === 'UnauthorizedError') { res.send(401, 'Unauthorized');  }
	};	
	app.use(unauthorizedError401);

//****************************************************************************
	
	//We are going to protect /api and /dashboard routes with JWT
	var secret = global.configuration.auth.secret;
	
	app.use('/api', expressJwt({secret: secret}));
	app.use('/dashboard', expressJwt({secret: secret}));

//****************************************************************************
	
	var contentHandler = new ContentHandler(db);
	var sessionHandler = new SessionHandler(db, secret); 

	app.get('/greeting', contentHandler.greeting );

	app.post('/register', sessionHandler.handleSignup ); 
	app.post('/authenticate', sessionHandler.handleLoginRequest );
	
//****************************************************************************

	app.use(ErrorHandler);
};