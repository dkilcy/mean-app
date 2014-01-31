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
module.exports = exports = function(app, db, io) {

	var unauthorizedError401 = function(err, req, res, next) {
		if (err.constructor.name === 'UnauthorizedError') { res.send(401, 'Unauthorized');  }
	};	
	app.use(unauthorizedError401);

//****************************************************************************
	
	//We are going to protect /api and /dashboard routes with JWT
	var secret = global.configuration.auth.secret;
	
	//app.use('/api', expressJwt({secret: secret}));
	app.use('/dashboard', expressJwt({secret: secret}));
	
//****************************************************************************
	
	var contentHandler = new ContentHandler(db, io);
	var sessionHandler = new SessionHandler(db); 

	//===============================================================
	app.get('/dashboard/hiringManager', contentHandler.hiringManager );
	app.get('/dashboard/itManager', contentHandler.itManager );
	app.get('/dashboard/hrManager', contentHandler.hrManager );
	app.get('/dashboard/applicant', contentHandler.applicant );
	
	//===============================================================
	
	app.get('/api/greeting', contentHandler.greeting );
	
	app.get('/api/widgets', contentHandler.getWidgets );
	app.post('/api/widgets', contentHandler.postWidget );
	app.delete( '/api/widgets', contentHandler.deleteWidget )
	
	app.post('/signup', sessionHandler.handleSignup ); 
	app.post('/login', sessionHandler.handleLoginRequest );
	app.post('/logout', sessionHandler.handleLogout );	

//****************************************************************************
	
	app.use(ErrorHandler);
};